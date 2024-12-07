// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the metadata field
    const metadata = data.metadata;
    const names = data.names; // Use 'names' to populate dropdown
    const samples = data.samples;

    // Populate the dropdown with sample names
    const dropdown = d3.select("#selDataset");
    names.forEach((sample) => {
      dropdown.append("option").text(sample).property("value", sample);
    });

    // Filter the metadata for the object with the desired sample number
    const filteredResult = metadata.filter(metadata => metadata.id == sample)[0];
    const panel = d3.select("#sample-metadata");
    
    // Use `.html("")` to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new tags for each key-value in the filtered metadata.
    Object.entries(filteredResult).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
  });
}

// Build the charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    const result = samples.filter(sampleObj => sampleObj.id == sample)[0];
    const otu_ids = result.otu_ids;
    const otu_labels = result.otu_labels;
    const sample_values = result.sample_values;

    // Build the Bubble Chart
    const bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      },
      text: otu_labels
    };

    const bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: {title: "Number of Bacteria"},
      hovermode: "closest"
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Slice and reverse the input data appropriately
    const barTrace = {
      type: "bar",
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      orientation: "h",
      marker: { color: "rgb(135, 206, 235)" }
    };

    const barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"},
      margin: { t: 30, l: 150 }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", [barTrace], barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const names = data.names;
    const firstSample = names[0]; // Use names array here

    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
