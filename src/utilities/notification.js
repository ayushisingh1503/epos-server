import Scaledrone from "scaledrone-node";

export const notify = async (event, message) => {
  try {
    const drone = new Scaledrone(process.env.SCALEDRONE_CHANNEL_ID);

    drone.on("open", () => {
      console.log("Connection established");
      drone.publish({ room: event, message });
    });
  } catch (e) {
    console.warn(e);
  }
};
