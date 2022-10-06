import React from "react";
import { useParams } from "react-router-dom";
import { useGetScenarioByIdQuery } from "../../services/api";
import moment from "moment";
import { Card, Badge, CardText, CardHeader, CardBody } from "reactstrap";
import { FaLocationArrow } from "react-icons/fa";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { RiReactjsFill } from "react-icons/ri";
import { BiTime } from "react-icons/bi";
import { GiCharacter } from "react-icons/gi";
import { MdOutlineDescription } from "react-icons/md";

export function ScenarioDetail() {
  const { sId } = useParams();
  const { data, error, isLoading } = useGetScenarioByIdQuery(sId);
  const castColors = [
    "secondary",
    "primary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
  ];

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h2>
            <RiReactjsFill />
            {" " + data.title}
          </h2>
          <h3>
            <BsFillChatLeftTextFill />
            {" " + data.subtitle}
          </h3>
          <h4>
            <FaLocationArrow />
            {" " + data.venue}
          </h4>
          <h4>
            <GiCharacter />
            {" Characters"}
          </h4>
          {JSON.parse(data.casts) &&
            JSON.parse(data.casts).map((cast, index) => (
              <>
                <Badge color={castColors[cast.colorIndex]} key={index}>
                  {cast.name}
                </Badge>{" "}
              </>
            ))}
          {JSON.parse(data.castFeatures) &&
            JSON.parse(data.castFeatures).map((cI, index) => (
              <Card
                className="my-2"
                color={castColors[cI.cast.colorIndex]}
                inverse
                key={index}
              >
                <CardHeader>{cI.cast.name} </CardHeader>
                <CardBody>
                  <CardText>{cI.features.replaceAll("*", ", ")}</CardText>
                </CardBody>
              </Card>
            ))}
          <h6>
            <BiTime />
            {" Yazılma Zamanı " + moment(data.createdAt).fromNow()}
          </h6>
          <hr/>
          <h6>
            <MdOutlineDescription />
            {" Senaryo"}
          </h6>
          {JSON.parse(data.script) &&
            JSON.parse(data.script).map((fs, index) => (
              <>
                <Card
                  color={castColors[fs.cast.colorIndex]}
                  key={index}
                  className="card"
                >
                  <CardText className="text-white">
                    {fs.cast.name + ": " + fs.text}
                  </CardText>
                </Card>
              </>
            ))}
        </>
      ) : null}
    </div>
  );
}
