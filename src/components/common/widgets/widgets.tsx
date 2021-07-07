import React from 'react';
import { Segment, Message, Icon, Popup, Label } from 'semantic-ui-react';

export function LockSymbol({lockedAdmin, lockedSuperadmin}) {
  if (lockedSuperadmin) {
    return <Icon color='black'  name="user secret" />
  } else if (lockedAdmin) {
    return <Icon color='black' name="lock" />
  }
  return null;
}

export function Stars({numStars, includeNoRating}) {
  var stars = null;
  if (includeNoRating && numStars===-1) {
    stars = <Label basic size="mini"><Icon name="x"/>No rating</Label>;
  } else if (numStars===0.5) {
    stars = <Icon color='black' name="star half" />;
  } else if (numStars===1.0) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /></div>;
  } else if (numStars===1.5) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /><Icon color='black' name="star half" /></div>;
  } else if (numStars===2.0) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /><Icon color='black' name="star" /></div>;
  } else if (numStars===2.5) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /><Icon color='black' name="star" /><Icon color='black' name="star half" /></div>;
  } else if (numStars===3.0) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /><Icon color='black' name="star" /><Icon color='black' name="star" /></div>;
  }
  if (stars) {
    return (
      <Popup
        trigger={stars}
        header="Rating:"
        content={
          <div>
            <Icon name="star" /> Nice<br/>
            <Icon name="star" /><Icon name="star" /> Very nice<br/>
            <Icon name="star" /><Icon name="star" /><Icon name="star" /> Fantastic!<br/>
            {includeNoRating && <><Label basic size="mini"><Icon name="x"/>No rating</Label> User has not rated</>}
          </div>
        }
      />
    );
  }
  return null;
}

export function LoadingAndRestoreScroll() {
  window.scrollTo(0, 0);
  return (
    <Message icon style={{backgroundColor: "white"}}>
      <Icon name='circle notched' loading />
      <Message.Content>
        <Message.Header>Just one second</Message.Header>
        We are fetching that content for you.
      </Message.Content>
    </Message>
  );
}

export function InsufficientPrivileges() {
  return (
    <Segment>
      <h3>Insufficient privileges</h3>
      Contact <a href="mailto:jostein.oygarden@gmail.com">Jostein Øygarden</a> if you want permissions.
    </Segment>
  )
}