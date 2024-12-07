# homework11
Bellybutton Biodiversity Dashboard
This JavaScript application uses the D3.js and Plotly libraries to visualize data related to bacterial cultures found in belly button samples. It generates a dashboard that displays metadata and two interactive charts: a bar chart and a bubble chart.

Features
Dropdown Menu: The dashboard includes a dropdown menu that allows users to select a sample from a list.
Metadata Panel: Displays key demographic information about the selected sample, such as ethnicity, gender, age, and the frequency of belly button bacteria.
Bar Chart: Shows the top 10 bacterial species found in the selected sample. The chart displays the OTU (Operational Taxonomic Unit) IDs on the y-axis and the number of bacterial cultures on the x-axis.
Bubble Chart: Displays each bacterial sample as a bubble, where the size of the bubble corresponds to the number of bacteria, and the color represents the OTU ID. The chart helps visualize the distribution of different bacterial species across the selected sample.
How It Works
buildMetadata(sample):

Fetches the metadata from a JSON file.
Filters the metadata for the selected sample.
Displays the key-value pairs of the metadata in a panel on the page.
buildCharts(sample):

Fetches the sample data from a JSON file.
Creates a bubble chart showing the distribution of bacterial cultures in the selected sample.
Creates a bar chart displaying the top 10 bacterial species found in the sample.
init():

Initializes the dashboard by loading the first sample from the dataset and displaying the metadata and charts.
optionChanged(newSample):

Triggered when a user selects a new sample from the dropdown menu.
Updates the metadata panel and charts with data for the selected sample.

Libraries Used
D3.js: For reading JSON data and manipulating the DOM.
Plotly.js: For rendering interactive charts (bar and bubble charts).
