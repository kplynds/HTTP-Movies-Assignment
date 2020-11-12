import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
// yewwww
const getNumber = (string) => {
  var int = "";
  for (let i = 0; i < string.length; i++) {
    if (isNaN(string[i]) == false) {
      int += string[i];
    }
  }
  return parseInt(int);
};

const MovieForm = (props) => {
  const [values, setValues] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const params = useParams();
  let history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const id = params.id;
    axios
      .put(`http://localhost:5000/api/movies/${getNumber(id)}`, values)
      .then((res) => {
        console.log(res);
        props.setMovieList(res.data);
        setValues({
          id: "",
          title: "",
          director: "",
          metascore: "",
          stars: [],
        });
        history.push(`/movies/${getNumber(id)}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMovie(getNumber(params.id));
    console.log(getNumber(params.id));
  }, [params.id]);

  return (
    <div className="form">
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          name="title"
          id="title"
          value={values.title || ""}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="director"
          id="director"
          value={values.director || ""}
          onChange={handleChange}
          placeholder="Director"
        />
        <input
          type="number"
          name="metascore"
          id="metascore"
          value={values.metascore}
          onChange={handleChange}
          placeholder="Metascore"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MovieForm;
