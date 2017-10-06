import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Map from './common/map/map';
import Gallery from './common/gallery/gallery';
import Request from 'superagent';
import { LinkContainer } from 'react-router-bootstrap';
import { Tabs, Tab, Well, Panel, ButtonGroup, Button, Breadcrumb, OverlayTrigger, Popover, Tooltip, Table } from 'react-bootstrap';
import auth from '../utils/auth.js';
import TickModal from './common/tick-modal/tick-modal';
import CommentModal from './common/comment-modal/comment-modal';
import config from '../utils/config.js';

export default class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1,
      showTickModal: false,
      showCommentModal: false
    };
  }

  refresh(id) {
    Request.get(config.getUrl("problems?regionId=" + config.getRegion() + "&id=" + id)).withCredentials().end((err, res) => {
      if (err) {
        this.setState({error: err});
      } else {
        this.setState({
          areaId: res.body[0].areaId,
          areaVisibility: res.body[0].areaVisibility,
          areaName: res.body[0].areaName,
          sectorId: res.body[0].sectorId,
          sectorVisibility: res.body[0].sectorVisibility,
          sectorName: res.body[0].sectorName,
          sectorLat: res.body[0].sectorLat,
          sectorLng: res.body[0].sectorLng,
          id: res.body[0].id,
          visibility: res.body[0].visibility,
          nr: res.body[0].nr,
          name: res.body[0].name,
          comment: res.body[0].comment,
          grade: res.body[0].grade,
          originalGrade: res.body[0].originalGrade,
          fa: res.body[0].fa,
          faDate: res.body[0].faDate,
          lat: res.body[0].lat,
          lng: res.body[0].lng,
          media: res.body[0].media,
          ticks: res.body[0].ticks,
          comments: res.body[0].comments
        });
        document.title=config.getTitle() + " | " + this.state.name;
      }
    });
  }

  componentDidMount() {
    this.refresh(this.props.match.params.problemId);
  }

  componentWillReceiveProps(nextProps) {
    this.refresh(nextProps.match.params.problemId);
  }

  handleTabsSelection(key) {
    this.setState({tabIndex: key});
  }

  /* intersperse: Return an array with the separator interspersed between
   * each element of the input array.
   *
   * > _([1,2,3]).intersperse(0)
   * [1,0,2,0,3]
  */
  intersperse(arr, sep) {
    if (arr.length === 0) {
      return [];
    }
    return arr.slice(1).reduce((xs, x, i) => {
      return (xs.concat([sep, x]));
    }, [arr[0]]);
  }

  closeTickModal(event) {
    this.setState({ showTickModal: false });
    this.refresh(this.props.match.params.problemId);
  }

  openTickModal(event) {
    this.setState({ showTickModal: true });
  }

  closeCommentModal(event) {
    this.setState({ showCommentModal: false });
    this.refresh(this.props.match.params.problemId);
  }

  openCommentModal(event) {
    this.setState({ showCommentModal: true });
  }

  onRemoveMedia(idMediaToRemove) {
    const allMedia = this.state.media.filter(m => m.id!=idMediaToRemove);
    this.setState({media: allMedia});
  }

  render() {
    if (this.state.error) {
      return <span><h3>{this.state.error.status}</h3>{this.state.error.toString()}</span>;
    }
    if (!this.state.id) {
      return <center><i className="fa fa-cog fa-spin fa-2x"></i></center>;
    }

    const markers = [];
    if (this.state.lat>0 && this.state.lng>0) {
      markers.push({
        lat: this.state.lat,
        lng: this.state.lng,
        title: this.state.name + ' [' + this.state.grade + ']',
        label: this.state.name.charAt(0),
        url: '/problem/' + this.state.id,
        icon: {
          url: (this.state.ticks && this.state.ticks.filter(t => t.writable).length>0)? 'https://mt.google.com/vt/icon?name=icons/spotlight/spotlight-waypoint-a.png' : 'https://mt.google.com/vt/icon?name=icons/spotlight/spotlight-waypoint-b.png',
          labelOrigin: new google.maps.Point(11, 13)
        }
      });
    }
    if (this.state.sectorLat>0 && this.state.sectorLng>0) {
      markers.push({
        lat: this.state.sectorLat,
        lng: this.state.sectorLng,
        title: 'Parking',
        labelContent: this.state.sectorName,
        icon: {
          url: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
          scaledSize: new google.maps.Size(32, 32)
        },
        url: '/sector/' + this.state.sectorId
      });
    }
    const map = markers.length>0? <Map markers={markers} defaultCenter={{lat: markers[0].lat, lng: markers[0].lng}} defaultZoom={16}/> : null;
    const gallery = this.state.media && this.state.media.length>0? <Gallery media={this.state.media} showThumbnails={false} removeMedia={this.onRemoveMedia.bind(this)} /> : null;
    var topoContent = null;
    if (map && gallery) {
      topoContent = (
        <Tabs activeKey={this.state.tabIndex} animation={false} onSelect={this.handleTabsSelection.bind(this)} id="problem_tab" unmountOnExit={true}>
          <Tab eventKey={1} title="Media">{this.state.tabIndex==1? gallery : false}</Tab>
          <Tab eventKey={2} title="Map">{this.state.tabIndex==2? map : false}</Tab>
        </Tabs>
      );
    } else if (map) {
      topoContent = map;
    } else if (gallery) {
      topoContent = gallery;
    }
    var fa = this.state.fa? this.state.fa.map((u, i) => {return (<Link key={i} to={`/user/${u.id}`}>{u.firstname} {u.surname}</Link>)}) : [];
    fa = this.intersperse(fa, ", ");

    var table = null;
    if (this.state.ticks) {
      const rows = this.state.ticks.map((t, i) => {
        const isTickedClassName = t.writable? 'success' : '';
        var stars = "";
        if (t.stars===0.0) { stars = <div style={{whiteSpace: 'nowrap'}} id={0}><i className="fa fa-star-o"/><i className="fa fa-star-o"/><i className="fa fa-star-o"/></div>; }
        else if (t.stars===0.5) { stars = <div style={{whiteSpace: 'nowrap'}} id={1}><i className="fa fa-star-half-o"/><i className="fa fa-star-o"/><i className="fa fa-star-o"/></div>; }
        else if (t.stars===1.0) { stars = <div style={{whiteSpace: 'nowrap'}} id={2}><i className="fa fa-star"/><i className="fa fa-star-o"/><i className="fa fa-star-o"/></div>; }
        else if (t.stars===1.5) { stars = <div style={{whiteSpace: 'nowrap'}} id={3}><i className="fa fa-star"/><i className="fa fa-star-half-o"/><i className="fa fa-star-o"/></div>; }
        else if (t.stars===2.0) { stars = <div style={{whiteSpace: 'nowrap'}} id={4}><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star-o"/></div>; }
        else if (t.stars===2.5) { stars = <div style={{whiteSpace: 'nowrap'}} id={5}><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star-half-o"/></div>; }
        else if (t.stars===3.0) { stars = <div style={{whiteSpace: 'nowrap'}} id={6}><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></div>; }
        return (
          <tr className={isTickedClassName} key={i}>
            <td>{t.date}</td>
            <td><Link to={`/user/${t.idUser}`}>{t.name}</Link></td>
            <td>{t.suggestedGrade}</td>
            <td>{t.comment}</td>
            <td>
              <OverlayTrigger placement="top" overlay={
                <Popover id={i} title="Guidelines">
                  <i className="fa fa-star-o"/><i className="fa fa-star-o"/><i className="fa fa-star-o"/><br/>
                  <i className="fa fa-star"/><i className="fa fa-star-o"/><i className="fa fa-star-o"/> Nice<br/>
                  <i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star-o"/> Very nice<br/>
                  <i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/> Fantastic!
                </Popover>
              }>{stars}</OverlayTrigger>
            </td>
          </tr>
        );
      });
      table = (
        <Table striped condensed hover>
          <thead>
            <tr>
              <th>When</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Comment</th>
              <th>Stars</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      );
    }

    var comment = null;
    if (this.state.comments) {
      const comments = this.state.comments.map((c, i) => {
        const header = <span><Link to={`/user/${c.idUser}`}>{c.name}</Link> <small><i>{c.date}</i></small></span>;
        return (
          <Panel key={i} header={header}>
            {c.message}
          </Panel>
        );
      });
      comment = <span>{comments}</span>;
    };

    var headerButtons = null;
    if (auth.loggedIn()) {
      headerButtons = (
        <div style={{float: 'right'}}>
          <ButtonGroup>
            <OverlayTrigger placement="top" overlay={<Tooltip id={-1}>Tick problem</Tooltip>}>
              <Button bsStyle="primary" bsSize="xsmall" onClick={this.openTickModal.bind(this)}>Tick</Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip id={-2}>Add comment</Tooltip>}>
              <Button bsStyle="primary" bsSize="xsmall" onClick={this.openCommentModal.bind(this)}><i className="fa fa-inverse fa-commenting-o"/></Button>
            </OverlayTrigger>
            {auth.isAdmin() &&
              <OverlayTrigger placement="top" overlay={<Tooltip id={this.state.id}>Edit problem</Tooltip>}>
                <LinkContainer to={{ pathname: `/problem/edit/${this.state.id}`, query: { idSector: this.state.sectorId, lat: this.state.sectorLat, lng: this.state.sectorLng } }}><Button bsStyle="primary" bsSize="xsmall"><i className="fa fa-inverse fa-pencil-square-o"/></Button></LinkContainer>
              </OverlayTrigger>
            }
          </ButtonGroup>
        </div>
      );
    }

    var tickModal = null;
    if (this.state.ticks) {
      const userTicks = this.state.ticks.filter(t => t.writable);
      if (userTicks && userTicks.length>0) {
        tickModal = <TickModal idTick={userTicks[0].id} idProblem={this.state.id} date={userTicks[0].date} comment={userTicks[0].comment} grade={userTicks[0].suggestedGrade} stars={userTicks[0].stars} show={this.state.showTickModal} onHide={this.closeTickModal.bind(this)}/>
      }
    }
    if (!tickModal) {
      tickModal = <TickModal idTick={-1} idProblem={this.state.id} grade={this.state.originalGrade} show={this.state.showTickModal} onHide={this.closeTickModal.bind(this)}/>;
    }

    return (
      <span>
        {tickModal}
        <CommentModal idProblem={this.state.id} show={this.state.showCommentModal} onHide={this.closeCommentModal.bind(this)}/>

        <Breadcrumb>
          {headerButtons}
          <Link to={`/`}>Home</Link> / <Link to={`/browse`}>Browse</Link> / <Link to={`/area/${this.state.areaId}`}>{this.state.areaName}</Link> {this.state.areaVisibility===1 && <i className="fa fa-lock"></i>}{this.state.areaVisibility===2 && <i className="fa fa-expeditedssl"></i>} / <Link to={`/sector/${this.state.sectorId}`}>{this.state.sectorName}</Link> {this.state.sectorVisibility===1 && <i className="fa fa-lock"></i>}{this.state.sectorVisibility===2 && <i className="fa fa-expeditedssl"></i>} / {this.state.nr} <font color='#777'>{this.state.name}</font> {this.state.grade} {this.state.visibility===1 && <i className="fa fa-lock"></i>}{this.state.visibility===2 && <i className="fa fa-expeditedssl"></i>}
        </Breadcrumb>
        {topoContent}
        <Well bsSize="small">
          <strong>Comment:</strong> {this.state.comment}<br/>
          <strong>FA:</strong> {fa}<br/>
          <strong>FA date:</strong> {this.state.faDate}<br/>
          <strong>Original grade:</strong> {this.state.originalGrade}<br/>
          {this.state.sectorLat>0 && this.state.sectorLng>0 &&
            <span><a href={`http://maps.google.com/maps?q=loc:${this.state.sectorLat},${this.state.sectorLng}&navigate=yes`} target="_blank">Start navigation</a><br/></span>}
        </Well>
        {table}
        {comment}
      </span>
    );
  }
}
