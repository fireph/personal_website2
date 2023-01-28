import fs from "fs";
import path from "path";
import sharp from "sharp";
import { defineConfig, PluginOption } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import legacy from "@vitejs/plugin-legacy";

const convert = async (
  imageFormats: { folder: string; ext: string; resize: number; options: any }[],
  dir: string,
  name: string
) => {
  const nameWithoutExt = path.parse(name).name;
  const fullname = "./public/" + dir + "/" + name;
  await Promise.all(
    imageFormats.map((format) => {
      fs.mkdirSync("./public/" + format.folder + "/" + dir + "/", {
        recursive: true,
      });
      let sharpPromise = sharp(fs.readFileSync(fullname));
      if (format.resize > 0) {
        sharpPromise = sharpPromise.resize(format.resize);
      }
      return sharpPromise
        .toFormat(format.ext, format.options)
        .toFile(
          "./public/" +
            format.folder +
            "/" +
            dir +
            "/" +
            nameWithoutExt +
            "." +
            format.ext
        );
    })
  );
};

function convertTinyImagesPlugin(): PluginOption {
  const convertAllTinyImages = async () => {
    const imageFormats = [
      {
        folder: "tiny",
        ext: "jpg",
        resize: 16,
        options: { mozjpeg: true, quality: 50 },
      },
    ];
    imageFormats.forEach((format) => {
      fs.rmSync("./public/" + format.folder, { recursive: true, force: true });
    });

    await Promise.all(
      fs
        .readdirSync("./public/img/projects")
        .map((name) => convert(imageFormats, "img/projects", name))
    );
  };

  return {
    name: "convert-tiny-images-plugin",
    enforce: "pre",
    async buildStart() {
      await convertAllTinyImages();
    },
  };
}

function convertImagesPlugin(): PluginOption {
  const convertAllImages = async () => {
    const imageFormats = [
      {
        folder: "webp",
        ext: "webp",
        resize: 0,
        options: { quality: 50, effort: 6 },
      },
      {
        folder: "avif",
        ext: "avif",
        resize: 0,
        options: { quality: 50, effort: 9 },
      },
      {
        folder: "jpg",
        ext: "jpg",
        resize: 0,
        options: { mozjpeg: true, quality: 50 },
      },
    ];
    imageFormats.forEach((format) => {
      fs.rmSync("./public/" + format.folder, { recursive: true, force: true });
    });

    await Promise.all([
      Promise.all(
        fs
          .readdirSync("./public/img/projects")
          .map((name) => convert(imageFormats, "img/projects", name))
      ),
      convert(imageFormats, "img", "profile_pic.jpg"),
      convert(imageFormats, "img", "myprojects.jpg"),
    ]);
  };

  return {
    name: "convert-images-plugin",
    enforce: "pre",
    apply: "build",
    async buildStart() {
      await convertAllImages();
    },
  };
}

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults"],
    }),
    createHtmlPlugin({
      minify: true,
      entry: "src/main.ts",
    }),
    viteSingleFile(),
    convertImagesPlugin(),
    convertTinyImagesPlugin(),
  ],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 1024 * 1024,
  },
});
