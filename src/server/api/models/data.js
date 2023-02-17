class DataModel {
  async fetch(endpoint) {
    let data = null

    try {
      data = await fetch(endpoint)
        .then(response => response.json())
    } catch (e) {
      console.log("Unable to fetch -", e);
    }

    return data
  }
}

module.exports = DataModel
