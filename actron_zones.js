class ActronZonesCard extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="Zones">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];
    //const stateStr = state ? state.state : "unavailable";
    const stateStr = state ? Object.entries(state.context).toString() : "unavailable";

    // get the device Id so we can find the related entities
    const deviceName = this.config.device;
    console.log(`Device is ${deviceName}, and there are ${hass.devices.size} devices`);
    let deviceId = null;
    for (let [id, device] of hass.devices) {
      console.log(`Looking at ${device.id}, named ${device.name_by_user}`);
      if (device.name_by_user == deviceName) {
        deviceId = hass.devices[i].id;
        break;
      }
    }

    if (!deviceId) {
      throw new Error(`Unable to find device ${deviceName}`);
    }
    
    this.content.innerHTML = `
      The id of ${deviceName} is ${deviceId}
      <br><br>
    `;
  }

  // The user supplied configuration. Throw an exception and Home Assistant
  // will render an error card.
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }
}

customElements.define("actron-zones-card", ActronZonesCard);
