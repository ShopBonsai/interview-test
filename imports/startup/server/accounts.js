ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      loginStyle: "popup",
      appId: "630301687359818",
      secret: "8d956c419c8aa16cb5eb001efccb7740"
    }
  }
);
ServiceConfiguration.configurations.upsert(
  { service: "twitter" },
  {
    $set: {
      loginStyle: "popup",
      consumerKey: "2zKitJXgwiMYBTAUiIuj8ptjC",
      secret: "DwVuolYsjjDEHp3DEAeaCJGlFK4pU4tFtNdRTOYj3wpKJrIxcu"
    }
  }
);

ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      loginStyle: "popup",
      clientId: "450b75828f9f4bb2f1e7",
      secret: "33d40ea6efb9893009830dc1a3c528e7248b89ae"
    }
  }
);

ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      loginStyle: "popup",
      clientId:
      "252268818391-37vsccjprqjdgmb3q1hg6g0gvqpl93vs.apps.googleusercontent.com",
      secret: "H-yBS_NVCs-pSZ85_6r4Hvw1"
    }
  }
);
