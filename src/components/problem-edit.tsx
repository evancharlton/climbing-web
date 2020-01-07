import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import UserSelector from './common/user-selector/user-selector';
import ProblemSection from './common/problem-section/problem-section';
import ImageUpload from './common/image-upload/image-upload';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Form, Button, Input, Dropdown, TextArea } from 'semantic-ui-react';
import Leaflet from './common/leaflet/leaflet';
import { useAuth0 } from '../utils/react-auth0-spa';
import { getProblemEdit, convertFromDateToString, convertFromStringToDate, postProblem } from '../api';
import { LoadingAndRestoreScroll, InsufficientPrivileges } from './common/widgets/widgets';
import { useHistory, useParams, useLocation } from 'react-router-dom';

const ProblemEdit = () => {
  const { accessToken, loading, isAuthenticated, loginWithRedirect } = useAuth0();
  const [data, setData] = useState();
  const [saving, setSaving] = useState(false);
  let { sectorIdProblemId } = useParams();
  let history = useHistory();
  let location = useLocation();
  useEffect(() => {
    if (sectorIdProblemId && accessToken) {
      getProblemEdit(accessToken, sectorIdProblemId).then((data) => setData(data));
    }
  }, [accessToken, sectorIdProblemId]);

  function onNameChanged(e, { value }) {
    setData(prevState => ({ ...prevState, name: value }));
  }

  function onNrChanged(e, { value }) {
    setData(prevState => ({ ...prevState, nr: value }));
  }

  function onLatChanged(e, { value }) {
    setData(prevState => ({ ...prevState, lat: parseFloat(value) }));
  }

  function onLngChanged(e, { value }) {
    setData(prevState => ({ ...prevState, lng: parseFloat(value) }));
  }

  function onVisibilityChanged(e, { value }) {
    setData(prevState => ({ ...prevState, visibility: value }));
  }

  function onCommentChanged(e, { value }) {
    setData(prevState => ({ ...prevState, comment: value }));
  }

  function onFaDateChanged(newFaDate) {
    let faDate = newFaDate? convertFromDateToString(newFaDate) : null;
    setData(prevState => ({ ...prevState, faDate }));
  }

  function onOriginalGradeChanged(e, { value }) {
    setData(prevState => ({ ...prevState, originalGrade: value }));
  }

  function onTypeIdChanged(e, { value }) {
    let typeId = parseInt(value);
    setData(prevState => ({ ...prevState, typeId }));
  }

  function onNewMediaChanged(newMedia) {
    setData(prevState => ({ ...prevState, newMedia }));
  }

  function save(event) {
    event.preventDefault();
    setSaving(true);
    postProblem(
      accessToken,
      data.sectorId,
      data.id,
      data.visibility,
      data.name,
      data.comment,
      data.originalGrade,
      data.fa,
      data.faDate,
      data.nr,
      (data.typeId? data.metadata.types.find(t => t.id === data.typeId) : data.metadata.types[0]),
      data.lat,
      data.lng,
      data.sections,
      data.newMedia)
    .then((response) => {
      history.push("/problem/" + response.id);
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  function onMapClick(event) {
    setData(prevState => ({ ...prevState, lat: event.latlng.lat, lng: event.latlng.lng }));
  }

  function onUsersUpdated(newUsers) {
    let fa = newUsers.map(u => {
      return {id: (typeof u.value === 'string' || u.value instanceof String)? -1 : u.value, name: u.label};
    });
    setData(prevState => ({ ...prevState, fa }));
  }

  function onSectionsUpdated(sections) {
    setData(prevState => ({ ...prevState, sections }));
  }

  if (loading || (isAuthenticated && !data)) {
    return <LoadingAndRestoreScroll />;
  } else if (!isAuthenticated) {
    loginWithRedirect({appState: { targetUrl: location.pathname }});
  } else if (!data.metadata.isAdmin) {
    return <InsufficientPrivileges />
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);
  var defaultCenter;
  var defaultZoom: number;
  if (data.lat!=0 && data.lng!=0) {
    defaultCenter = {lat: data.lat, lng: data.lng};
    defaultZoom = 15;
  }
  else {
    defaultCenter = data.metadata.defaultCenter;
    defaultZoom = data.metadata.defaultZoom;
  }
  const visibilityOptions = [
    {key: 0, value: 0, text: "Visible for everyone"},
    {key: 1, value: 1, text: "Only visible for administrators"}
  ];
  if (data.metadata.isSuperAdmin) {
    visibilityOptions.push({key: 2, value: 2, text: "Only visible for super administrators"})
  }
  return (
    <>
      <MetaTags>
        <title>{data.metadata.title}</title>
      </MetaTags>
      <Form>
        <Form.Field>
          <label>Name</label>
          <Input placeholder='Enter name' value={data.name} onChange={onNameChanged} />
        </Form.Field>
        <Form.Field>
          <label>FA date (yyyy-mm-dd)</label>
          <DayPickerInput
            format="LL"
            onDayChange={onFaDateChanged}
            value={convertFromStringToDate(data.faDate)}
          /><br/>
          <Button.Group>
            <Button onClick={() => onFaDateChanged(yesterday)}>Yesterday</Button>
            <Button onClick={() => onFaDateChanged(new Date())}>Today</Button>
          </Button.Group>
        </Form.Field>
        {data.metadata.types.length > 1 &&
          <Form.Field>
            <label>Type</label>
            <Dropdown selection value={data.typeId} onChange={onTypeIdChanged}
              options={data.metadata.types.map((t, i) => {
                const text = t.type + (t.subType? " - " + t.subType : "")
                return ({key: i, value: t.id, text: text});
              })}/>
          </Form.Field>
        }
        <Form.Field>
          <label>Grade</label>
          <Dropdown selection value={data.originalGrade} onChange={onOriginalGradeChanged}
            options={data.metadata.grades.map((g, i) => ({key: i, value: g.grade, text: g.grade}))}/>
        </Form.Field>
        <Form.Field>
          <label>FA</label>
          <UserSelector isMulti={true} placeholder="Select user(s)" users={data.fa? data.fa.map(u => {return {value: u.id, label: u.name}}) : []} onUsersUpdated={onUsersUpdated} identity={null} />
        </Form.Field>
        <Form.Field>
          <label>Visibility</label>
          <Dropdown selection value={data.visibility} onChange={onVisibilityChanged} options={visibilityOptions}/>
        </Form.Field>
        <Form.Field>
          <label>Sector number</label>
          <Input placeholder='Enter number' value={data.nr} onChange={onNrChanged} />
        </Form.Field>
        <Form.Field>
          <label>Comment</label>
          <TextArea placeholder='Enter comment' style={{ minHeight: 100 }} value={data.comment} onChange={onCommentChanged} />
        </Form.Field>
        {!data.metadata.isBouldering &&
          <Form.Field>
            <label>Pitches</label>
            <ProblemSection sections={data.sections} grades={data.metadata.grades} onSectionsUpdated={onSectionsUpdated} />
          </Form.Field>
        }
        <Form.Field>
          <label>New media</label><br/>
          <ImageUpload onMediaChanged={onNewMediaChanged} />
        </Form.Field>
        <Form.Field>
          <label>Click to mark problem on map</label><br/>
          <Leaflet
            markers={data.lat!=0 && data.lng!=0 && [{lat: data.lat, lng: data.lng}]}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            onClick={onMapClick}
            history={history}
          />
        </Form.Field>
        <Form.Field>
          <label>Latitude</label>
          <Input placeholder='Latitude' value={data.lat} onChange={onLatChanged} />
        </Form.Field>
        <Form.Field>
          <label>Longitude</label>
          <Input placeholder='Longitude' value={data.lng} onChange={onLngChanged} />
        </Form.Field>
        <Button.Group>
          <Button negative onClick={() => history.push(`/problem/${sectorIdProblemId.split("-")[1]}`)}>Cancel</Button>
          <Button.Or />
          <Button positive loading={saving} onClick={save}>Save</Button>
        </Button.Group>
      </Form>
    </>
  );
}

export default ProblemEdit;
