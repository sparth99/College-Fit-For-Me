import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const styles = {
  cardWrapper: {
    textAlign: 'left',
    width: '22vw',
    margin: '0vh 1vw',
  },
};

export default function ProfileCard(props) {
  const { member } = props;
  return (
    <Card style={styles.cardWrapper}>
      <Card.Img variant="top" src={member.photoURL} />
      <Card.Body>
        <Card.Title>{member.name}</Card.Title>
        <Card.Subtitle>{member.role}</Card.Subtitle>
        <Card.Text />
        <Card.Text>{member.bio}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {member.commitCount} commits, {member.issueCount} issues,{' '}
        {member.testCount} unit tests
      </Card.Footer>
    </Card>
  );
}

ProfileCard.propTypes = {
  member: PropTypes.shape({
    photoURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    commitCount: PropTypes.number.isRequired,
    issueCount: PropTypes.number.isRequired,
    testCount: PropTypes.number.isRequired,
  }),
};
