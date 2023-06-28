const DisplayGraph = () => {
  const w = 800;
  const h = 400;
  const barWidth = w / 275;
  const padding = 60;

  const svg = d3
    .select(".graph")
    .append("svg")
    .attr("width", w + 100)
    .attr("height", h + 50);

  document.addEventListener("DOMContentLoaded", () =>
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let times = data.map((entry) => 
          entry["Time"]
        );

        let years = data.map((entry) => entry["Year"]);

        const minTime = d3.min(times)
        const maxTime = d3.max(times)
        const minYear = d3.min(years)
        const maxYear = d3.max(years)

        console.log(minTime, maxTime, minYear, maxYear);

        const xScale = d3.scaleLinear().domain([minYear, maxYear]).range([padding,w-padding])

        const yScale = d3.scaleTime().domain([minTime, maxTime]).range([h,0])

        const xAxis = d3.axisBottom(xScale);

        const yAxis = d3.axisLeft(yScale);
        
        svg
        .append("g")
        .attr("transform", "translate(0," + (h) + ")")
        .attr("id", "x-axis")
        .call(xAxis)

      svg
        .append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .attr("id", "y-axis")
        .call(yAxis);

      })
  );
};
