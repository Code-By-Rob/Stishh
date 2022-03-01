const country = d3.select('.country-outline');
const mapWidth = country.attr('width');
const mapHeight = country.attr('height');
const json = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
let countryCenter = null;
try {
    d3.json(json).then(mapData => {
        const countries = topojson.feature(mapData, mapData['objects']['countries']);
        console.log(countries);
        const toGuess = countries.features.filter(d => {
            console.log(d.properties.name);
            return d.properties.name === 'France';
        })
        const projection = d3.geoMercator().center([2, 47]).scale(980).translate([mapWidth/2, mapHeight/2]);
        const pathGenerator = d3.geoPath().projection(projection);
        console.log(toGuess);
        countryCenter = pathGenerator.centroid(toGuess);
        console.log(countryCenter);
        country.append('g')
            .selectAll('path')
            .data(toGuess)
            .enter()
            .append('path')
                .attr('fill', 'grey')
                .attr('d', pathGenerator)
            .style('stoke', 'none');
    })

} catch(err) {
    console.log(err);
}