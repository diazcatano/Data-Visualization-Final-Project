const data = [

  { year: '1980' , count: 0 },
  { year: '1982' , count: 1 },
  { year: '1987' , count: 1 },
  { year: '1989'  , count: 2 },
  { year: '1990'  , count: 0 },
  { year: '1991'  , count: 2 },
  { year: '1992'  , count: 3 },
  { year: '1993'  , count: 2 },
  { year: '1994'  , count: 8 },
  { year: '1995'  , count: 2 },
  { year: '1996'  , count: 2 },
  { year: '1997'  , count: 5 },
  { year: '1998'  , count: 7 },
  { year: '1999'  , count: 4 },
  { year: '2000'  , count: 10 },
  { year: '2001'  , count: 14 },
  { year: '2002'  , count: 10 },
  { year: '2003'  , count: 24 },
  { year: '2004'  , count: 36 },
  { year: '2005'  , count: 152 },
  { year: '2006'  , count: 717 },
  { year: '2007'  , count: 768 },
  { year: '2008'  , count: 418 },
  { year: '2009'  , count: 62 },
  { year: '2010'  , count: 20 },
  { year: '2011'  , count: 75 },
  { year: '2012'  , count: 217 },
  { year: '2013'  , count: 295 },
  { year: '2014'  , count: 381 },
  { year: '2015'  , count: 396 },
  { year: '2016'  , count: 490 },
  { year: '2017'  , count: 582 },
  { year: '2018'  , count: 575 },
  { year: '2019'  , count: 558 },
  { year: '2020'  , count: 458 },
  { year: '2021'  , count: 158 },
  { year: '2022'  , count: 117 },

];

const width = 1500;
const height = 500;
const margin = { top:50, bottom:50, left: 50, right: 50 };

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height])

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.2)

const y = d3.scaleLinear()
  .domain([0, 800])
  .range([height - margin.bottom, margin.top])

svg
  .append("g")
  .attr("fill", 'royalblue')
  .selectAll("rect")
  .data(data.sort((a, b) => d3.ascending(a.year, b.year)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.count))
    .attr('title', (d) => d.count)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.count))
    .attr("width", x.bandwidth());

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format)
    .ticks(10))
    .attr("font-size", '14px')
    .append("text")
         .attr("transform", "rotate(-90)")
         .attr("font-size", '20px')
         .attr("y",30)
         .attr("x", -150)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         /*.attr("stroke", "black")*/
         .attr("font-family", "sans-serif")
         .attr("fill","black")
         .text("Amount of Store Build");
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].year))
    .attr("font-size", '14px')
    .append("text")
    .attr("font-size", '20px')
    .attr("y",50)
    .attr("x", 600)
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("fill","black")
    .text("Year");
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();
