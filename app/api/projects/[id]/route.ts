import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { projectSchema } from "@/lib/validators";
import { requireApiAuth } from "@/lib/auth";
import { deletePublicImage, savePublicImage } from "@/lib/files";

function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return trimmed;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAuth(request);

  if (!auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await context.params;

    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    const formData = await request.formData();
    const title = String(formData.get("title") || "");
    const description = String(formData.get("description") || "");
    const techStackRaw = String(formData.get("techStack") || "");
    const githubLink = normalizeUrl(String(formData.get("githubLink") || ""));
    const liveLink = normalizeUrl(String(formData.get("liveLink") || ""));
    const isFeatured = String(formData.get("isFeatured") || "false") === "true";
    const image = formData.get("image");

    const techStack = techStackRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const parsed = projectSchema.safeParse({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      isFeatured,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: parsed.error.issues[0]?.message || "Invalid project payload.",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    if (parsed.data.isFeatured && !existingProject.isFeatured) {
      const featuredCount = await Project.countDocuments({ isFeatured: true });
      if (featuredCount >= 3) {
        return NextResponse.json(
          { message: "Only 3 projects can be featured on the homepage." },
          { status: 400 }
        );
      }
    }

    let imagePath = existingProject.imagePath;

    if (image instanceof File && image.size > 0) {
      imagePath = await savePublicImage(image, "projects");
      await deletePublicImage(existingProject.imagePath);
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      {
        ...parsed.data,
        imagePath,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Could not update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAuth(request);

  if (!auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await context.params;
    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    await Project.findByIdAndDelete(id);
    await deletePublicImage(existingProject.imagePath);

    return NextResponse.json({ message: "Project deleted." });
  } catch {
    return NextResponse.json({ message: "Could not delete project." }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiAuth(request);

  if (!auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await context.params;
    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const isFeatured = Boolean(body?.isFeatured);

    if (isFeatured && !existingProject.isFeatured) {
      const featuredCount = await Project.countDocuments({ isFeatured: true });
      if (featuredCount >= 3) {
        return NextResponse.json(
          { message: "Only 3 projects can be featured on the homepage." },
          { status: 400 }
        );
      }
    }

    existingProject.isFeatured = isFeatured;
    await existingProject.save();

    return NextResponse.json(existingProject);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Could not update featured state." },
      { status: 500 }
    );
  }
}
