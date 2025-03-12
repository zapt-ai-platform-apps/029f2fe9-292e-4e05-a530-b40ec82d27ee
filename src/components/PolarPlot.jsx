import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function PolarPlot({ bearing }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (bearing === undefined || bearing === null) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content
    
    const width = svg.node().getBoundingClientRect().width;
    const height = width; // Make it square
    const radius = Math.min(width, height) / 2 - 30;
    
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
    
    // Draw the circle
    g.append("circle")
      .attr("r", radius)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);
    
    // Draw degree markers (every 30 degrees)
    for (let i = 0; i < 360; i += 30) {
      const angle = i * Math.PI / 180;
      const x1 = Math.sin(angle) * radius;
      const y1 = -Math.cos(angle) * radius;
      const x2 = Math.sin(angle) * (radius - 15);
      const y2 = -Math.cos(angle) * (radius - 15);
      
      g.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "#999")
        .attr("stroke-width", 1);
        
      g.append("text")
        .attr("x", Math.sin(angle) * (radius - 25))
        .attr("y", -Math.cos(angle) * (radius - 25))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#666")
        .text(i.toString());
    }
    
    // Draw cardinal directions
    const directions = [
      { dir: "N", angle: 0 },
      { dir: "E", angle: 90 },
      { dir: "S", angle: 180 },
      { dir: "W", angle: 270 }
    ];
    
    directions.forEach(({ dir, angle }) => {
      const rads = angle * Math.PI / 180;
      g.append("text")
        .attr("x", Math.sin(rads) * (radius + 15))
        .attr("y", -Math.cos(rads) * (radius + 15))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "#333")
        .text(dir);
    });
    
    // Draw the bearing line
    const bearingRad = bearing * Math.PI / 180;
    const x = Math.sin(bearingRad) * radius;
    const y = -Math.cos(bearingRad) * radius;
    
    g.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", x)
      .attr("y2", y)
      .attr("stroke", "red")
      .attr("stroke-width", 3);
      
    // Draw arrowhead
    const arrowSize = 15;
    const arrowAngle = 30 * Math.PI / 180;
    
    // Calculate arrowhead points
    const x1 = x - arrowSize * Math.cos(bearingRad - arrowAngle);
    const y1 = y - arrowSize * Math.sin(bearingRad - arrowAngle);
    const x2 = x - arrowSize * Math.cos(bearingRad + arrowAngle);
    const y2 = y - arrowSize * Math.sin(bearingRad + arrowAngle);
    
    g.append("polygon")
      .attr("points", `${x},${y} ${x1},${y1} ${x2},${y2}`)
      .attr("fill", "red");
      
    // Add bearing text
    g.append("text")
      .attr("x", 0)
      .attr("y", -radius - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#000")
      .text(`Bearing: ${bearing}°`);
    
  }, [bearing]);
  
  return (
    <div className="w-full h-3/5">
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
}