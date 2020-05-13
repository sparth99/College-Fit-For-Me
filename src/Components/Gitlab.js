import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProfileCard from './ProfileCard';
import { members } from '../static_resources/members';
import { gitlab } from '../instance';
import axios from 'axios';

const styles = {
  memberWrapper: {
    marginTop: '2vh',
    marginBottom: '4vh',
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    margin: '2vh 0vw',
  },
  statsRow: {
    margin: '2vh 5vw',
  },
};

export default class Gitlab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: [],
      issues: [],
    };
  }

  componentDidMount() {
    axios
      .all([
        gitlab.get('projects/16968914/repository/contributors'),
        gitlab.get('projects/16968914/issues?per_page=100&page=1'),
      ])
      .then((responseArr) => [responseArr[0].data, responseArr[1].data])
      .then(
        axios.spread((contributors, issues) => {
          this.setState({ contributors, issues });
        })
      )
      .catch(console.warn);
  }

  populateCommits = () => {
    // Get each members commit count
    for (const member of members) {
      const memberCommitCount = this.state.contributors
        .filter(
          (contributor) =>
            contributor['name'] === member['name'] ||
            contributor['email'] === member['email']
        )
        .reduce((sum, record) => sum + record.commits, 0);
      member['commitCount'] = memberCommitCount;
    }
  };

  populateIssues = () => {
    // match member.userName to issue.author.username
    for (const member of members) {
      var issues = this.state.issues.filter(
        (issue) =>
          issue['author']['name'] === member['name'] ||
          issue['author']['username'] === member['username'] ||
          (issue['assignee'] !== null &&
            issue['assignee']['username'] === member['userName'])
      );
      member['issueCount'] = issues.length;
    }
  };

  getCommitCount = () =>
    members.reduce((sum, member) => sum + member.commitCount, 0);

  render() {
    this.populateCommits();
    this.populateIssues();

    return (
      <Col>
        <div>
          <h2>Group Members</h2>
          <Col style={styles.memberWrapper}>
            <div style={styles.cardRow}>
              <ProfileCard member={members[0]} />
              <ProfileCard member={members[1]} />
              <ProfileCard member={members[2]} />
            </div>
            <div style={styles.cardRow}>
              <ProfileCard member={members[3]} />
              <ProfileCard member={members[4]} />
              <ProfileCard member={members[5]} />
            </div>
          </Col>
        </div>
        <div style={styles.statsWrapper}>
          <h2>Repository Stats</h2>
          <Row style={styles.statsRow}>
            <Col>
              <h3>{this.getCommitCount()} Commits</h3>
            </Col>
            <Col>
              <h3>{this.state.issues.length} Issues</h3>
            </Col>
            <Col>
              <h3>59 Unit Tests</h3>
            </Col>
          </Row>
        </div>
      </Col>
    );
  }
}
