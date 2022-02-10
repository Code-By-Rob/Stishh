const world = d3.select('.world-map');
const worldWidth = +world.attr('width');
const worldHeight = +world.attr('height');
const navbarHeight = 60;

const viewWidth = screen.width;
const viewHeight = screen.height;

let geoJson = null;

const topoJson = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

d3.json(topoJson)
.then(data => {
    const countries = topojson.feature(data, data['objects']['countries']);
    const projection = 
    d3.geoEquirectangular()
        .rotate([-11, 0])
        .scale(viewWidth/6)
        .translate([viewWidth/2, viewHeight/2 - navbarHeight]);
    const pathGenerator = d3.geoPath().projection(projection);
    world.selectAll('path').data(countries['features'])
        .enter().append('path')
        .attr('class', 'country')
        .attr('id', d => d.properties.name.split(' ').join('').split('.').join(''.split("'").join('')))
        .attr('fill', 'rgb(207, 207, 207)')
        .attr('d', pathGenerator)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
})

function handleMouseOver() {
    d3.select(this)
        .attr('fill', 'rgb(0, 207, 0)')
        .attr('cursor', 'pointer');
}
function handleMouseOut() {
    d3.select(this)
        .attr('fill', 'rgb(207, 207, 207)');
}