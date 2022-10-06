import React, { useState, useEffect } from "react";
import { Form, Button, CardText } from "reactstrap";
import { useAddScenarioMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FormGroupElement } from "./formGroupElement";
import { Badge, Card, CardHeader, CardBody } from "reactstrap";
import {
  AiOutlineCloseCircle,
  AiFillEdit,
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
export function NewScenario() {
  const [addNewScenario] = useAddScenarioMutation();
  const [casts, setCasts] = useState([
    { id: uuidv4(), name: "Genel", colorIndex: 0 },
  ]);
  const [activeCast, setActiveCast] = useState(null);
  const [fullScript, setFullScript] = useState([]);
  const [castFeatures, setCastFeatures] = useState([]);
  const castColors = [
    "secondary",
    "primary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
  ];

  useEffect(() => { 
    const castIds = casts.map((c) => c.id);
    setActiveCast(null);

    //castFeatures
    let newCastFeatures = [...castFeatures];
    newCastFeatures = newCastFeatures.filter((cf) =>
      castIds.includes(cf.cast.id)
    );
    setCastFeatures(newCastFeatures);

    // //fullScript
    let newFs = [...fullScript];
    newFs = newFs.filter((fs) => castIds.includes(fs.cast.id));
    setFullScript(newFs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [casts]);

  const navigate = useNavigate();
  const [formGroupInfo, setFormGroupInfo] = useState({
    title: {
      value: "",
      isValid: null,
      reasonForInvalid: "",
    },
    subtitle: {
      value: "",
      isValid: null,
      reasonForInvalid: "",
    },
    venue: {
      value: "",
      isValid: null,
      reasonForInvalid: "",
    },
    castName: {
      value: "",
      isValid: null,
      reasonForInvalid: "",
    },
    castFeature: {
      value: "",
      isValid: null,
      reasonForInvalid: "",
    },
    script: {
      value: "",
      isValid: null,
      reasonForInvalid: "",
    },
  });

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    if (inputValue.trim() === "") {
      setFormGroupInfo((prev) => ({
        ...prev,
        [inputName]: {
          value: inputValue,
          isValid: false,
          reasonForInvalid: "empty",
        },
      }));
    } else {
      setFormGroupInfo((prev) => ({
        ...prev,
        [inputName]: {
          value: inputValue.trim(),
          isValid: true,
          reasonForInvalid: "",
        },
      }));
    }
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (document.activeElement.id === "castName") {
        if (formGroupInfo.castName.isValid) {
          let c = [...casts];
          let existedCast = c.find(
            (cI) => cI.name === formGroupInfo.castName.value
          );
          if (existedCast) {
          } else {
            c.push({
              id: uuidv4(),
              name: formGroupInfo.castName.value,
              colorIndex: c.length % 7,
            });
          }
          setCasts(c);
        }
      }
      if (document.activeElement.id === "castFeature") {
        if (formGroupInfo.castFeature.isValid && activeCast) {
          let cf = [...castFeatures];
          let existedCast = cf.find((cI) => cI.cast.name === activeCast.name);
          if (existedCast) {
            existedCast["features"] += "*" + formGroupInfo.castFeature.value;
          } else {
            cf.push({
              cast: activeCast,
              features: formGroupInfo.castFeature.value,
            });
          }
          setCastFeatures(cf);
        }
      }
      if (document.activeElement.id === "script") {
        if (formGroupInfo.script.isValid && activeCast) {
          let fs = [...fullScript];
          fs.push({ cast: activeCast, text: formGroupInfo.script.value });
          setFullScript(fs);
        }
      }
    }
  };
  const onSubmitHandler = (e) => {
    let titleValid = formGroupInfo.title.isValid;
    let subtitleValid = formGroupInfo.subtitle.isValid;
    let venueValid = formGroupInfo.venue.isValid;
    try {
      e.preventDefault();
      if (titleValid && subtitleValid && venueValid) {
        addNewScenario({
          title: formGroupInfo.title.value,
          subtitle: formGroupInfo.subtitle.value,
          venue: formGroupInfo.venue.value,
          casts: JSON.stringify(casts),
          castFeatures:JSON.stringify(castFeatures),
          script: JSON.stringify(fullScript),
        })
          .unwrap()
          .then((response) => console.log("donuyom babba", response)) //post created alertify
          .catch((error) => {
            console.log(error);
          });
        navigate("/", { replace: true });
      } else {
        alert("Oops! something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Form inline onSubmit={onSubmitHandler}>
        <FormGroupElement
          formGroupInfo={formGroupInfo.title}
          inputId="title"
          inputName="title"
          inputPlaceholder="Title"
          inputType="text"
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
        />
        <br></br>
        <FormGroupElement
          formGroupInfo={formGroupInfo.subtitle}
          inputId="subtitle"
          inputName="subtitle"
          inputPlaceholder="Subtitle"
          inputType="text"
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
        />
        <br></br>
        <FormGroupElement
          formGroupInfo={formGroupInfo.venue}
          inputId="venue"
          inputName="venue"
          inputPlaceholder="venue"
          inputType="text"
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
        />
        <br></br>
        <FormGroupElement
          formGroupInfo={formGroupInfo.castName}
          inputId="castName"
          inputName="castName"
          inputPlaceholder="put a cast name then press enter"
          inputType="text"
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
        />
        {casts &&
          casts.map((cast, index) => (
            <>
              <Badge
                color={castColors[cast.colorIndex]}
                key={index}
                onClick={() => setActiveCast(cast)}
              >
                {activeCast && cast.id === activeCast.id
                  ? cast.name.toUpperCase()
                  : cast.name}
              </Badge>{" "}
              <AiOutlineCloseCircle
                onClick={() => {
                  if (
                    window.confirm("are you sure you want to delete this cast?")
                  ) {
                    let c = [...casts];
                    c.splice(index, 1);
                    setCasts(c);
                  }
                }}
              />{" "}
              <AiFillEdit
                onClick={() => {
                  let newCastName = prompt("Please enter the cast name");
                  if (newCastName !== null) {
                    let c = [...casts];
                    c[index]["name"] = newCastName;
                    setCasts(c);
                  }
                }}
              />{" "}
            </>
          ))}
        <br></br>
        <br></br>
        <FormGroupElement
          formGroupInfo={formGroupInfo.castFeature}
          inputId="castFeature"
          inputName="castFeature"
          inputPlaceholder="Cast Feature"
          inputType="text"
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
        />
        <br></br>
        {castFeatures &&
          castFeatures.map((cI, index) => (
            <Card
              className="my-2"
              color={castColors[cI.cast.colorIndex]}
              inverse
              key={index}
            >
              <CardHeader>
                {cI.cast.name}{" "}
                <AiOutlineCloseCircle
                  onClick={() => {
                    if (
                      window.confirm(
                        "are you sure you want to delete this cast feature box?"
                      )
                    ) {
                      let c = [...castFeatures];
                      c.splice(index, 1);
                      setCastFeatures(c);
                    }
                  }}
                />{" "}
                <AiFillEdit
                  onClick={() => {
                    let newFeature = prompt(
                      "Please update the features",
                      cI.features.replaceAll("*", ", ")
                    );
                    if (newFeature !== null) {
                      let c = [...castFeatures];
                      c[index]["features"] = newFeature;
                      setCastFeatures(c);
                    }
                  }}
                />
              </CardHeader>
              <CardBody>
                <CardText>{cI.features.replaceAll("*", ", ")}</CardText>
              </CardBody>
            </Card>
          ))}
        <br></br>
        <FormGroupElement
          formGroupInfo={formGroupInfo.script}
          inputId="script"
          inputName="script"
          inputPlaceholder="Content"
          inputType="textarea"
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
        />
        {fullScript.length > 0
          ? fullScript.map((fs, index) => (
              <>
                <Card
                  color={castColors[fs.cast.colorIndex]}
                  key={index}
                  className="card"
                >
                  <CardText className="text-white">
                    {fs.cast ? fs.cast.name + ": " + fs.text : null}{" "}
                  </CardText>
                </Card>
                <AiFillCloseCircle
                  onClick={() => {
                    if (
                      window.confirm(
                        "are you sure you want to delete this text?"
                      )
                    ) {
                      let newFs = [...fullScript];
                      newFs.splice(index, 1);
                      setFullScript(newFs);
                    }
                  }}
                />{" "}
                <AiFillEdit
                  onClick={() => {
                    let newText = prompt("Please update the text", fs.text);
                    if (newText !== null) {
                      let newFs = [...fullScript];
                      newFs[index]["text"] = newText;
                      setFullScript(newFs);
                    }
                  }}
                />{" "}
                <FaExchangeAlt
                  onClick={() => {
                    let newIndex = prompt(
                      "Please enter the row number to change",
                      index
                    );
                    if (newIndex !== null) {
                      let newFs = [...fullScript];
                      newFs.splice(index, 1);
                      newFs.splice(parseInt(newIndex), 0, fs);
                      setFullScript(newFs);
                    }
                  }}
                />
              </>
            ))
          : null}
        <br></br>
        <br></br>
        <Button color="danger">Submit</Button>{" "}
      </Form>
    </div>
  );
}
