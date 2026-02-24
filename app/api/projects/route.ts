import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { projectSchema } from "@/lib/validators";
import { requireApiAuth } from "@/lib/auth";
import { savePublicImage } from "@/lib/files";

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

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(
    projects.map((project) => ({
      ...project,
      isFeatured: Boolean(project.isFeatured),
    }))
  );
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth(request);

  if (!auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
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

    if (!(image instanceof File)) {
      return NextResponse.json({ message: "Project image is required." }, { status: 400 });
    }

    if (parsed.data.isFeatured) {
      const featuredCount = await Project.countDocuments({ isFeatured: true });
      if (featuredCount >= 3) {
        return NextResponse.json(
          { message: "Only 3 projects can be featured on the homepage." },
          { status: 400 }
        );
      }
    }

    const imagePath = await savePublicImage(image, "projects");

    const project = await Project.create({
      ...parsed.data,
      imagePath,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Could not create project.",
      },
      { status: 500 }
    );
  }
}
