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

    // get the device Id so we can find the related entities
    const coreEntityId = this.config.entity;
    const coreEntity = hass.entities[coreEntityId];
    if (!coreEntity) {
      throw new Error(`Could not find entity ${coreEntityId}`);
    }
    const deviceId = coreEntity.device_id;

    // find the zones associated with the core entity
    let zones = [];
    for (const [id, entity] of Object.entries(hass.entities)) {
      if (entity.device_id == deviceId && 
          id.startsWith("climate.") &&
          id != coreEntityId) {
        zones.push(id);
        console.log(id);
      }
    }    
    
    this.content.innerHTML = `
      The device id of ${coreEntityId} is ${deviceId}
      <br><br>
      Found ${zones.length} zones!
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
