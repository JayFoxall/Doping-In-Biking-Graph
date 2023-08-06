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

    var tooltip = d3
    .select(".graph")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute");

    var legend = d3
    .select(".graph")
    .append("div")
    .attr("id", "legend")
    .text("I am legend")


  document.addEventListener("DOMContentLoaded", () =>
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    )
      .then((response) => response.json())
      .then((data) => {

        
        let dopingEntries = data.map(entry => entry)
        let times = data.map((entry) => entry["Time"]);
        let seconds = data.map((entry) => entry["Seconds"]);
        let years = data.map((entry) => entry["Year"]);

        const minSeconds = d3.min(seconds);
        const maxSeconds = d3.max(seconds);
        const minYear = d3.min(years);
        const maxYear = d3.max(years);

        const xScale = d3
          .scaleLinear()
          .domain([(minYear - 1), maxYear])
          .range([padding, w - padding]);

        const yScale = d3
          .scaleLinear()
          .domain([minSeconds, maxSeconds])
          .range([0, h]);

        const xAxis = d3.axisBottom(xScale)
                        .tickFormat(d3.format(" "))
        const yAxis = d3
                        .axisLeft(yScale)
                        .tickFormat(function(d){
                        var minutes = Math.floor(d / 60);
                        var seconds = (d % 60).toFixed(0);
                        return minutes + ":" + (seconds === "0" ? "00" : seconds)
                        })
                        //.tickFormat(d3.format("g0"))
                        
        ;

        svg
          .append("g")
          .attr("transform", "translate(0," + h + ")")
          .attr("id", "x-axis")
          .call(xAxis)

        svg
          .append("g")
          .attr("transform", "translate(" + padding + ",0)")
          .attr("id", "y-axis")
          .call(yAxis);

          svg
          .selectAll("circle")
          .data(dopingEntries)
          .enter()
          .append("circle")
          .attr("class", "dot")
          .attr("data-xvalue", (d) => parseInt(d["Year"]))
          .attr("data-yvalue", (d) => {
            //should be split off into a function, which is then reused to make ticks too
            let mmssArray = d["Time"].split(":")
            let mmssFormat = new Date()
            
            mmssFormat.setMinutes(mmssArray[0]);
            mmssFormat.setSeconds(mmssArray[1]);
            return mmssFormat
          })
          .attr("cx", (d) => xScale(d["Year"]))
          .attr("cy", (d) => yScale(d["Seconds"]))
          .attr("r", 5)
          .on("mouseover", function (event, d) {;
            let coordinates = d3.pointer(event)
            let coordinateY = coordinates[0]
            let coordinateX = coordinates[1]
            tooltip.style("opacity", 0.6);
            tooltip
              .text(`Name: ${d.Name}, Nationality: ${d.Nationality}
              Year: ${d.Year}   
              Time: ${d.Time}     
              Doping: ${d.Doping}`
              )
              .attr("data-year", parseInt(d["Year"]))
              //.html("your text here")
              .style('left', (coordinateY) + 'px')
              .style('top', (coordinateX) + 'px')

          })
          .on("mouseout", function () {
            tooltip.style("opacity", 0);
          });

      })
  );
};
