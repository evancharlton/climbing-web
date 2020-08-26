import React from 'react';
import { Map, Circle, TileLayer, LayersControl, Marker, Polygon, Polyline, Tooltip, WMSTileLayer } from 'react-leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
let parkingIcon;

const Leaflet = ({ history, markers, outlines, polylines, height, defaultCenter, defaultZoom, onClick, onlyMap }) => {
  function calculateDistance(polyline) {
    var km = 0;
    for (var i = 1; i < polyline.length; i++) {
      const lat1 = polyline[i-1][0];
      const lng1 = polyline[i-1][1];
      const lat2 = polyline[i][0];
      const lng2 = polyline[i][1];
      km += calculateDistanceBetweenCoordinates(lat1, lng1, lat2, lng2);
    }
    if (km > 1) {
      return Math.round(km*100)/100 + " km";
    }
		return Math.round(km*1000) + " meter";
  }

  function calculateDistanceBetweenCoordinates(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the earth in km
		const dLat = deg2rad(lat2-lat1);  // deg2rad below
		const dLon = deg2rad(lng2-lng1); 
		const a = 
				Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
				Math.sin(dLon/2) * Math.sin(dLon/2)
				; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
		return deg * (Math.PI/180);
	}

  const renderMarkers = markers && markers.map((m, i) => {
    if (m.isParking) {
      if (parkingIcon == null) {
        const L = require('leaflet')
        parkingIcon = new L.icon({ iconUrl: '/png/parking_lot_maps.png', iconAnchor: [15, 15] })
      }
      return (
        <Marker position={[m.lat, m.lng]} key={i} onClick={() => onClick? null : history.push(m.url)} icon={parkingIcon}>
          {m.label && (
            <Tooltip opacity={0.5} permanent>
              {m.label}
            </Tooltip>
          )}
        </Marker>
      )
    } else {
      return (
        <Marker
          position={[m.lat, m.lng]}
          key={i}
          onClick={() => history.push(m.url)}
          draggable={false} >
          {m.label && (
            <Tooltip opacity={0.5} permanent>
              {m.label}
            </Tooltip>
          )}
        </Marker>
      )
    }
  })

  const polygons = outlines && outlines.map((o, i) => (
    <Polygon key={i} positions={o.polygon} onClick={() => {
      if (!onClick) {
        if (o.url.startsWith("https")) {
          var win = window.open(o.url, '_blank');
          win.focus();
        } else {
          history.push(o.url)
        }
      }
    }}>
      {o.label && (
        <Tooltip opacity={0.9} permanent>
          {o.label}
        </Tooltip>
      )}
    </Polygon>
  ))
  var renderPolylines;
  if (polylines) {
    renderPolylines = polylines.map((p, i) => {
      if (p.polyline.length == 1) {
        return <Circle key={i} center={p.polyline[0]} radius={0.5} />
      }
      else {
        const distance = calculateDistance(p.polyline);
        return (
        <Polyline key={i} color="lime" positions={p.polyline}>
          <Tooltip opacity={0.5} permanent>
            {polylines.length>1 && p.label + ": "}{distance}
          </Tooltip>
        </Polyline>);
      }
    })
  }
  const maxZoom = 21;
  return (
    <Map
      style={{height: (height? height : '500px'), width: '100%', zIndex: 0}}
      center={defaultCenter}
      zoom={defaultZoom}
      onClick={onClick}
      zoomControl={!onlyMap}
    >
      {!onlyMap?
        <>
          <FullscreenControl position="topright" />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked={true} name="Norge i Bilder">
              <TileLayer
                maxNativeZoom={maxZoom}
                minZoom={0}
                maxZoom={maxZoom}
                attribution='&copy; <a href="https://www.norgeibilder.no/" rel="noopener" target="_blank">Geovekst</a>'
                url='https://waapi.webatlas.no/maptiles/tiles/webatlas-orto-newup/wa_grid/{z}/{x}/{y}.jpeg?api_key=b8e36d51-119a-423b-b156-d744d54123d5'
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="OpenStreetMap">
              <TileLayer
                maxNativeZoom={maxZoom}
                minZoom={0}
                maxZoom={maxZoom}
                attribution='&copy; <a href="https://osm.org/copyright" rel="noopener" target="_blank">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Kartverket N50 topo">
              <TileLayer
                maxNativeZoom={15}
                minZoom={0}
                maxZoom={15}
                subdomains='23'
                attribution='&copy; <a href="https://wiki.openstreetmap.org/wiki/No:Kartverket_import" rel="noopener" target="_blank">Kartverket</a>'
                url='https://opencache{s}.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}'
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked={true} name="Stedsnavn">
              <WMSTileLayer
                  maxNativeZoom={maxZoom}
                  minZoom={0}
                  maxZoom={maxZoom}
                  transparent={true}
                  format={"image/png"}
                  layers={"Stedsnavn"}
                  version={"1.3.0"}
                  uppercase={true}
                  url="https://openwms.statkart.no/skwms1/wms.topo4"
                />
            </LayersControl.Overlay>

            <LayersControl.Overlay checked={true} name="Vegnett">
              <WMSTileLayer
                  maxNativeZoom={maxZoom}
                  minZoom={0}
                  maxZoom={maxZoom}
                  transparent={true}
                  format={"image/png"}
                  layers={"all"}
                  version={"1.3.0"}
                  uppercase={true}
                  url="https://openwms.statkart.no/skwms1/wms.vegnett"
                />
            </LayersControl.Overlay>

          </LayersControl>
        </>
        :
        <TileLayer
          maxNativeZoom={maxZoom}
          minZoom={0}
          maxZoom={maxZoom}
          url='https://waapi.webatlas.no/maptiles/tiles/webatlas-orto-newup/wa_grid/{z}/{x}/{y}.jpeg?api_key=b8e36d51-119a-423b-b156-d744d54123d5'
        />
      }
      {renderMarkers}
      {polygons}
      {renderPolylines}
    </Map>
  );
}

export default Leaflet;