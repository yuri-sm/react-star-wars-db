import React, { Component } from 'react';

import SwapiService from '../../services/SwapiService';
import ErrorButton from "../ErrorButton/ErrorButton";

import './PersonDetails.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({ person });
      });
  }

  render() {

    if (!this.state.person) {
      return <span>Выберите персонажа из списка</span>;
    }

    const { id, name, gender,
              birthYear, eyeColor } = this.state.person;

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Пол</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Год рождения</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Цвет глаз</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
