import React, { useState, useEffect, ComponentProps, useCallback } from "react";
import { Helmet } from "react-helmet";
import ImageUpload from "../common/image-upload/image-upload";
import { Loading } from "../common/widgets/widgets";
import {
  Checkbox,
  Form,
  Button,
  Input,
  TextArea,
  Segment,
  Accordion,
  Icon,
  Message,
} from "semantic-ui-react";
import { useMeta } from "../common/meta";
import {
  getElevation,
  getSectorEdit,
  postSector,
  getSector,
  getArea,
  useAccessToken,
} from "../../api";
import Leaflet from "../common/leaflet/leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { VisibilitySelectorField } from "../common/VisibilitySelector";
import { parsePolyline } from "../../utils/polyline";
import { components } from "../../@types/buldreinfo/swagger";
import { ProblemOrder } from "./ProblemOrder";
import { PolylineEditor } from "./PolylineEditor";
import { ZoomLogic } from "./ZoomLogic";
import { PolylineMarkers } from "./PolylineMarkers";

const useIds = (): { areaId: number; sectorId: number } => {
  const { sectorId, areaId } = useParams();
  return { sectorId: +sectorId, areaId: +areaId };
};

export const SectorEdit = () => {
  const accessToken = useAccessToken();
  const { areaId, sectorId } = useIds();
  const [leafletMode, setLeafletMode] = useState("PARKING");
  const [data, setData] = useState<components["schemas"]["Sector"]>(null);
  const [currPolygonPointFetched, setCurrPolygonPointFetched] = useState(0);
  const [currPolygonPoint, setCurrPolygonPoint] = useState(null);
  const [showProblemOrder, setShowProblemOrder] = useState(false);
  const [sectorMarkers, setSectorMarkers] = useState<any>(null);
  const [area, setArea] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const meta = useMeta();
  useEffect(() => {
    if (accessToken) {
      getSectorEdit(accessToken, areaId, sectorId)
        .then((data) => {
          setData(data);
        })
        .then(() => {
          getArea(accessToken, areaId).then((data) => setArea(data[0]));
        })
        .catch((e) => {
          setError(String(e));
        });
    }
  }, [accessToken, areaId, sectorId]);

  function onNameChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, name: value }));
  }

  function onLockedChanged({ lockedAdmin, lockedSuperadmin }) {
    setData((prevState) => ({
      ...prevState,
      lockedAdmin,
      lockedSuperadmin,
    }));
  }

  function onCommentChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, comment: value }));
  }

  function onAccessInfoChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, accessInfo: value }));
  }

  function onAccessClosedChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, accessClosed: value }));
  }

  const onNewMediaChanged = useCallback((newMedia) => {
    setData((prevState) => ({ ...prevState, newMedia }));
  }, []);

  function save(event) {
    event.preventDefault();
    const trash = data.trash ? true : false;
    if (!trash || confirm("Are you sure you want to move sector to trash?")) {
      setSaving(true);
      postSector(
        accessToken,
        data.areaId,
        data.id,
        data.trash,
        data.lockedAdmin,
        data.lockedSuperadmin,
        data.name,
        data.comment,
        data.accessInfo,
        data.accessClosed,
        data.lat,
        data.lng,
        data.polygonCoords,
        data.polyline,
        data.newMedia,
        data.problemOrder,
      )
        .then(async (res) => {
          navigate(res.destination);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }

  function onMapMouseClick(event) {
    if (leafletMode == "PARKING") {
      setData((prevState) => ({
        ...prevState,
        lat: event.latlng.lat,
        lng: event.latlng.lng,
        latStr: event.latlng.lat,
        lngStr: event.latlng.lng,
      }));
    } else if (leafletMode == "POLYGON") {
      const coords = event.latlng.lat + "," + event.latlng.lng;
      let { polygonCoords } = data;
      if (polygonCoords) {
        polygonCoords = polygonCoords + ";" + coords;
      } else {
        polygonCoords = coords;
      }
      setData((prevState) => ({ ...prevState, polygonCoords }));
    } else if (leafletMode == "POLYLINE") {
      const coords = event.latlng.lat + "," + event.latlng.lng;
      let { polyline } = data;
      if (polyline) {
        polyline = polyline + ";" + coords;
      } else {
        polyline = coords;
      }
      setData((prevState) => ({ ...prevState, polyline }));
    }
  }

  function onMouseMove(event) {
    if (leafletMode == "POLYGON") {
      const seconds = Math.floor(Date.now() / 1000);
      if (seconds > currPolygonPointFetched) {
        setCurrPolygonPointFetched(seconds);
        getElevation(accessToken, event.latlng.lat, event.latlng.lng).then(
          (res) => {
            setCurrPolygonPoint(
              " - " +
                event.latlng.lat.toFixed(2) +
                "," +
                event.latlng.lng.toFixed(2) +
                " (" +
                res +
                "m)",
            );
          },
        );
      }
    }
  }

  function clearDrawing() {
    if (leafletMode == "PARKING") {
      setData((prevState) => ({ ...prevState, lat: 0, lng: 0 }));
    } else if (leafletMode == "POLYGON") {
      setData((prevState) => ({ ...prevState, polygonCoords: null }));
    } else if (leafletMode == "POLYLINE") {
      setData((prevState) => ({ ...prevState, polyline: null }));
    }
  }

  function onLatChanged(_, { value }) {
    let latStr = value.replace(",", ".");
    let lat = parseFloat(latStr);
    if (isNaN(lat)) {
      lat = 0;
      latStr = "";
    }
    setData((prevState) => ({ ...prevState, lat, latStr }));
  }

  function onLngChanged(_, { value }) {
    let lngStr = value.replace(",", ".");
    let lng = parseFloat(lngStr);
    if (isNaN(lng)) {
      lng = 0;
      lngStr = "";
    }
    setData((prevState) => ({ ...prevState, lng, lngStr }));
  }

  if (error) {
    return (
      <Message
        size="huge"
        style={{ backgroundColor: "#FFF" }}
        icon="meh"
        header="404"
        content={
          "Cannot find the specified sector because it does not exist or you do not have sufficient permissions."
        }
      />
    );
  }

  if (!data || !area) {
    return <Loading />;
  }

  const outlines: ComponentProps<typeof Leaflet>["outlines"] = [];
  const polylines: ComponentProps<typeof Leaflet>["polylines"] = [];
  if (area) {
    area.sectors.forEach((sector) => {
      if (sector.id != data.id) {
        if (sector.polygonCoords) {
          const sectorPolygon = parsePolyline(sector.polygonCoords);
          if (sectorPolygon?.length > 0) {
            outlines.push({
              polygon: sectorPolygon,
              background: true,
              label: sector.name,
            });
          }
        }
        if (sector.polyline) {
          const sectorPolyline = parsePolyline(sector.polyline);
          if (sectorPolyline?.length > 0) {
            polylines.push({ polyline: sectorPolyline, background: true });
          }
        }
      }
    });
  }
  let polygonError = false;
  const polygon = parsePolyline(data.polygonCoords, () => {
    polygonError = true;
  });

  if (polygon?.length > 0) {
    outlines.push({ polygon, background: false });
  }
  const polyline = parsePolyline(data.polyline);
  if (polyline?.length > 0) {
    polylines.push({ polyline, background: false });
  }

  let defaultCenter;
  let defaultZoom;
  if (data.lat && data.lng) {
    defaultCenter = { lat: data.lat, lng: data.lng };
    defaultZoom = 14;
  } else if (area.lat && area.lat) {
    defaultCenter = { lat: area.lat, lng: area.lng };
    defaultZoom = 14;
  } else {
    defaultCenter = meta.defaultCenter;
    defaultZoom = meta.defaultZoom;
  }

  const markers: ComponentProps<typeof Leaflet>["markers"] = [];
  if (data.lat != 0 && data.lng != 0) {
    markers.push({ lat: data.lat, lng: data.lng, isParking: true });
  }
  if (sectorMarkers) {
    markers.push(...sectorMarkers);
  }

  return (
    <>
      <Helmet>
        <title>Edit {data.name}</title>
      </Helmet>
      <Message
        size="tiny"
        content={
          <>
            <Icon name="info" />
            Contact{" "}
            <a href="mailto:jostein.oygarden@gmail.com">Jostein Øygarden</a> if
            you want to move or split sector.
          </>
        }
      />
      <Form>
        <Segment>
          <Form.Group widths="equal">
            <Form.Field
              label="Sector name"
              control={Input}
              placeholder="Enter name"
              value={data.name}
              onChange={onNameChanged}
              error={data.name ? false : "Sector name required"}
            />
            <VisibilitySelectorField
              label="Visibility"
              selection
              value={{
                lockedAdmin: !!data.lockedAdmin,
                lockedSuperadmin: !!data.lockedSuperadmin,
              }}
              onChange={onLockedChanged}
            />
            <Form.Field>
              <label>Move to trash</label>
              <Checkbox
                disabled={!data.id || data.id <= 0}
                toggle
                checked={data.trash}
                onChange={() =>
                  setData((prevState) => ({
                    ...prevState,
                    trash: !data.trash,
                  }))
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Field
            label="Description"
            control={TextArea}
            placeholder="Enter description"
            style={{ minHeight: 100 }}
            value={data.comment}
            onChange={onCommentChanged}
          />
          <Form.Field>
            <Input
              label="Sector closed:"
              placeholder="Enter closed-reason..."
              value={data.accessClosed}
              onChange={onAccessClosedChanged}
              icon="attention"
            />
          </Form.Field>
          <Form.Field>
            <Input
              label="Sector restrictions:"
              placeholder="Enter specific restrictions..."
              value={data.accessInfo}
              onChange={onAccessInfoChanged}
            />
          </Form.Field>
        </Segment>

        <Segment>
          <Form.Field>
            <label>Upload image(s)</label>
            <ImageUpload
              onMediaChanged={onNewMediaChanged}
              isMultiPitch={false}
              includeVideoEmbedder={false}
            />
          </Form.Field>
        </Segment>

        <Segment>
          <Form.Group widths="equal">
            <Form.Field>
              <Button.Group size="tiny" compact>
                <Button
                  positive={leafletMode == "PARKING"}
                  onClick={() => setLeafletMode("PARKING")}
                >
                  Parking
                </Button>
                <Button
                  positive={leafletMode == "POLYGON"}
                  onClick={() => setLeafletMode("POLYGON")}
                >
                  Outline
                </Button>
                <Button
                  positive={leafletMode == "POLYLINE"}
                  onClick={() => setLeafletMode("POLYLINE")}
                >
                  Approach
                </Button>
                <Button color="orange" onClick={clearDrawing}>
                  Reset selected
                </Button>
              </Button.Group>
            </Form.Field>
            <Form.Field>
              <Button
                size="tiny"
                compact
                positive={sectorMarkers != null}
                onClick={() => {
                  if (sectorMarkers == null) {
                    if (sectorId) {
                      getSector(accessToken, sectorId).then((data) =>
                        setSectorMarkers(
                          data.problems
                            .filter((p) => p.lat > 0 && p.lng > 0)
                            .map((p) => ({
                              lat: p.lat,
                              lng: p.lng,
                              label: p.name,
                            })),
                        ),
                      );
                    }
                  } else {
                    setSectorMarkers(null);
                  }
                }}
              >
                Include all markers in sector
              </Button>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <Leaflet
                markers={markers}
                outlines={outlines}
                polylines={polylines}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                onMouseClick={onMapMouseClick}
                onMouseMove={onMouseMove}
                height={"300px"}
                showSatelliteImage={meta.isBouldering}
                clusterMarkers={false}
                rocks={null}
                flyToId={null}
              >
                <ZoomLogic area={area} sector={data} />
                {leafletMode === "POLYGON" && (
                  <PolylineMarkers polyline={data.polygonCoords} />
                )}
                {leafletMode === "POLYLINE" && (
                  <PolylineMarkers polyline={data.polyline} />
                )}
              </Leaflet>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            {leafletMode === "PARKING" && (
              <>
                <Form.Field>
                  <label>Latitude</label>
                  <Input
                    placeholder="Latitude"
                    value={data.lat ?? ""}
                    onChange={onLatChanged}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Longitude</label>
                  <Input
                    placeholder="Longitude"
                    value={data.lng ?? ""}
                    onChange={onLngChanged}
                  />
                </Form.Field>
              </>
            )}
            {leafletMode === "POLYGON" && (
              <Form.Field>
                <label>Outline {currPolygonPoint}</label>
                <PolylineEditor
                  polyline={data.polygonCoords}
                  onChange={(polygonCoords) =>
                    setData((prevState) => ({ ...prevState, polygonCoords }))
                  }
                />
              </Form.Field>
            )}
            {leafletMode === "POLYLINE" && (
              <Form.Field>
                <label>Approach</label>
                <PolylineEditor
                  polyline={data.polyline}
                  onChange={(polyline) =>
                    setData((prevState) => ({ ...prevState, polyline }))
                  }
                  upload
                />
              </Form.Field>
            )}
          </Form.Group>
        </Segment>

        {data.problemOrder?.length > 1 && (
          <Segment>
            <Accordion>
              <Accordion.Title
                active={showProblemOrder}
                onClick={() => setShowProblemOrder(!showProblemOrder)}
              >
                <Icon name="dropdown" />
                Change order of problems in sector
              </Accordion.Title>
              <Accordion.Content
                active={showProblemOrder}
                content={
                  <ProblemOrder
                    problemOrder={data.problemOrder}
                    onChange={(problemOrder) =>
                      setData((prevValue) => ({ ...prevValue, problemOrder }))
                    }
                  />
                }
              />
            </Accordion>
          </Segment>
        )}

        <Button.Group>
          <Button
            negative
            onClick={() => {
              if (sectorId) {
                navigate(`/sector/${sectorId}`);
              } else {
                navigate(`/area/${areaId}`);
              }
            }}
          >
            Cancel
          </Button>
          <Button.Or />
          <Button
            positive
            loading={saving}
            onClick={save}
            disabled={!data.name || polygonError}
          >
            Save sector
          </Button>
        </Button.Group>
      </Form>
    </>
  );
};

export default SectorEdit;