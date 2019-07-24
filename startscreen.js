const Jimp = require("jimp"),
  whelk = require("whelk");
whelk({
  friendlyName: "Make icons for multiple devices",
  description: "Make icons for diffrent screen sizes",
  inputs: {
    image: { type: "string", required: true },
    outdir: { type: "string", required: true },
    v: {
      type: "boolean",
      required: false,
      description: "Toggles verbose mode"
    },
    for: {
      type: "string",
      required: false,
      description:
        "Specifies which app the icon is for, example [cordova | vue] ",
      example: "cordova, vue",
      isIn: ["cordova", "vue", "ng", "react"],
      defaultsTo: "vue"
    }
  },
  exits: {
    success: {
      outputDescription: "Images have been proccessed successfully"
    }
  },

  fn: async function({ image, outdir, v }, exits) {
    let VUE_PWA = [
      //? There's a dash inbetween the name and width
      { name: "android-chrome", width: 192, heigth: 192 },
      { name: "android-chrome", width: 512, heigth: 512 },
      { name: "apple-touch-icon", width: 120, heigth: 120 },
      { name: "apple-touch-icon", width: 152, heigth: 152 },
      { name: "apple-touch-icon", width: 180, heigth: 180 },
      { name: "apple-touch-icon", width: 60, heigth: 60 },
      { name: "apple-touch-icon", width: 76, heigth: 76 },
      { name: "apple-touch-icon", width: 180, heigth: 180 },
      { name: "favicon", width: 16, heigth: 16 },
      { name: "favicon", width: 32, heigth: 32 },
      { name: "msapplication-icon", width: 144, heigth: 144 },
      { name: "mstile", width: 150, heigth: 150 },
      { name: "safari-pinned-tab", width: 20, heigth: 20 }
    ];

    VUE_PWA.forEach(pwa => {
      var finalName = `${pwa.name}-${pwa.width}x${pwa.heigth}.png`;
      if (v) {
        console.log(`✔ Generated ${finalName}`);
      }
      Jimp.read(image, (err, lenna) => {
        if (err) throw err;
        lenna
          .resize(pwa.width, pwa.heigth) // resize
          .quality(60) // set JPEG quality
          .write(`${outdir}/${finalName}`); // save
      });
    });
    // return exits.success("Generation completed!");
  }
});
