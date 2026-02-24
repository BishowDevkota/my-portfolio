import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { blogSchema, makeSlug } from "@/lib/validators";
import { requireApiAuth } from "@/lib/auth";
import { deletePublicImage, savePublicImage } from "@/lib/files";

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
    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    const formData = await request.formData();
    const title = String(formData.get("title") || "");
    const content = String(formData.get("content") || "");
    const excerpt = String(formData.get("excerpt") || "");
    const isFeatured = String(formData.get("isFeatured") || "false") === "true";
    const image = formData.get("image");

    const parsed = blogSchema.safeParse({
      title,
      content,
      excerpt,
      isFeatured,
    });

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid blog payload." }, { status: 400 });
    }

    if (parsed.data.isFeatured && !existingBlog.isFeatured) {
      const featuredCount = await Blog.countDocuments({ isFeatured: true });
      if (featuredCount >= 3) {
        return NextResponse.json(
          { message: "Only 3 blogs can be featured on the homepage." },
          { status: 400 }
        );
      }
    }

    let imagePath = existingBlog.imagePath;

    if (image instanceof File && image.size > 0) {
      imagePath = await savePublicImage(image, "blog");
      await deletePublicImage(existingBlog.imagePath);
    }

    let slug = existingBlog.slug;

    if (parsed.data.title !== existingBlog.title) {
      const slugBase = makeSlug(parsed.data.title);
      const slugCount = await Blog.countDocuments({
        slug: new RegExp(`^${slugBase}`),
        _id: { $ne: id },
      });
      slug = slugCount > 0 ? `${slugBase}-${slugCount + 1}` : slugBase;
    }

    const updated = await Blog.findByIdAndUpdate(
      id,
      {
        ...parsed.data,
        slug,
        imagePath,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Could not update blog." },
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
    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    await Blog.findByIdAndDelete(id);
    await deletePublicImage(existingBlog.imagePath);

    return NextResponse.json({ message: "Blog deleted." });
  } catch {
    return NextResponse.json({ message: "Could not delete blog." }, { status: 500 });
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
    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const isFeatured = Boolean(body?.isFeatured);

    if (isFeatured && !existingBlog.isFeatured) {
      const featuredCount = await Blog.countDocuments({ isFeatured: true });
      if (featuredCount >= 3) {
        return NextResponse.json(
          { message: "Only 3 blogs can be featured on the homepage." },
          { status: 400 }
        );
      }
    }

    existingBlog.isFeatured = isFeatured;
    await existingBlog.save();

    return NextResponse.json(existingBlog);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Could not update featured state." },
      { status: 500 }
    );
  }
}
