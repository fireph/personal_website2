import fs from "fs";
import path from "path";
import sharp from "sharp";
import { defineConfig, PluginOption } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import legacy from "@vitejs/plugin-legacy";

function convertImagesTinyPlugin(): PluginOption {
  const convertTiny = async (dir, name) => {
    const nameWithoutExt = path.parse(name).name;
    const fullname = "./public/" + dir + "/" + name;
    fs.mkdirSync("./public/tiny/" + dir + "/", { recursive: true });
    return sharp(fs.readFileSync(fullname))
      .resize({ width: 16 })
      .toFormat("jpg", { mozjpeg: true, quality: 50 })
      .toFile("./public/tiny/" + dir + "/" + nameWithoutExt + ".jpg");
  };
  const convertAllTinyImages = async () => {
    fs.rmSync("./public/tiny", { recursive: true, force: true });
    return Promise.all(
      fs
        .readdirSync("./public/img/projects")
        .map((name) => convertTiny("img/projects", name))
    );
  };
  return {
    name: "convert-images-tiny-plugin",
    enforce: "pre",
    buildStart: async () => {
      await convertAllTinyImages();
    },
  };
}

function convertImagesPlugin(): PluginOption {
  const convertAllImages = async () => {
    fs.rmSync("./public/jpg", { recursive: true, force: true });
    fs.rmSync("./public/webp", { recursive: true, force: true });
    fs.rmSync("./public/avif", { recursive: true, force: true });

    const convert = async (dir, name) => {
      const nameWithoutExt = path.parse(name).name;
      const fullname = "./public/" + dir + "/" + name;
      Promise.all(
        [
          ["jpg", { mozjpeg: true, quality: 50 }],
          ["webp", { quality: 50, effort: 6 }],
          ["avif", { quality: 50, effort: 9 }],
        ].map((format) => {
          fs.mkdirSync("./public/" + format[0] + "/" + dir + "/", {
            recursive: true,
          });
          return sharp(fs.readFileSync(fullname))
            .toFormat(format[0], format[1])
            .toFile(
              "./public/" +
                format[0] +
                "/" +
                dir +
                "/" +
                nameWithoutExt +
                "." +
                format[0]
            );
        })
      );
    };
    await Promise.all([
      ...fs
        .readdirSync("./public/img/projects")
        .map((name) => convert("img/projects", name)),
      convert("img", "profile_pic.jpg"),
      convert("img", "myprojects.jpg"),
    ]);
  };

  return {
    name: "convert-images-plugin",
    enforce: "post",
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
    convertImagesTinyPlugin(),
  ],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 1024 * 1024,
  },
});
