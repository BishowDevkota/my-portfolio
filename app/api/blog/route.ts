import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { blogSchema, makeSlug } from "@/lib/validators";
import { requireApiAuth } from "@/lib/auth";
import { savePublicImage } from "@/lib/files";

export async function GET() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(
    blogs.map((blog) => ({
      ...blog,
      isFeatured: Boolean(blog.isFeatured),
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

    if (!(image instanceof File)) {
      return NextResponse.json({ message: "Blog image is required." }, { status: 400 });
    }

    if (parsed.data.isFeatured) {
      const featuredCount = await Blog.countDocuments({ isFeatured: true });
      if (featuredCount >= 3) {
        return NextResponse.json(
          { message: "Only 3 blogs can be featured on the homepage." },
          { status: 400 }
        );
      }
    }

    const slugBase = makeSlug(parsed.data.title);
    const slugCount = await Blog.countDocuments({ slug: new RegExp(`^${slugBase}`) });
    const slug = slugCount > 0 ? `${slugBase}-${slugCount + 1}` : slugBase;

    const imagePath = await savePublicImage(image, "blog");

    const blog = await Blog.create({
      ...parsed.data,
      slug,
      imagePath,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Could not create blog post.",
      },
      { status: 500 }
    );
  }
}
