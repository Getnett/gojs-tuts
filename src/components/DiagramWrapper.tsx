import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import { useRef } from "react";
import "./DiagramWrapper.css";

interface DiagramWrapperProps {
    nodeDataArray: Array<go.ObjectData>;
}
interface Person {
    birthYear?: string;
    deathYear?: string;
    reign?: string;
}

// Gender Colors
const bluegrad = "#90CAF9";
const pinkgrad = "#F48FB1";

// get tooltip text from the object's data
function tooltipTextConverter(person: Person) {
    let str = "";
    str += "Born: " + person.birthYear;
    if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
    if (person.reign !== undefined) str += "\nReign: " + person.reign;
    return str;
}

// define Converters to be used for Bindings
function genderBrushConverter(gender: string): string {
    if (gender === "M") return bluegrad;
    if (gender === "F") return pinkgrad;
    return "orange";
}
function initDiagram(): go.Diagram {
    const makeGoObject = go.GraphObject.make;
    const goDiagram = makeGoObject(go.Diagram, {
        "toolManager.hoverDelay": 100,
        allowCopy: false,
        layout: makeGoObject(go.TreeLayout, {
            angle: 90,
            nodeSpacing: 10,
            layerSpacing: 40,
            layerStyle: go.TreeLayout.LayerUniform,
        }),
        model: makeGoObject(go.TreeModel),
    });
    // goDiagram.model = new go.TreeModel();

    goDiagram.add(
        makeGoObject(
            go.Part,
            "Table",
            { position: new go.Point(300, 10), selectable: false },
            makeGoObject(go.TextBlock, "Key", {
                row: 0,
                font: "700 14px Droid Serif, sans-serif",
            }), // end row 0
            makeGoObject(
                go.Panel,
                "Horizontal",
                { row: 1, alignment: go.Spot.Left },
                makeGoObject(go.Shape, "Rectangle", {
                    desiredSize: new go.Size(30, 30),
                    fill: bluegrad,
                    margin: 5,
                }),
                makeGoObject(go.TextBlock, "Males", {
                    font: "700 13px Droid Serif, sans-serif",
                })
            ), // end row 1
            makeGoObject(
                go.Panel,
                "Horizontal",
                { row: 2, alignment: go.Spot.Left },
                makeGoObject(go.Shape, "Rectangle", {
                    desiredSize: new go.Size(30, 30),
                    fill: pinkgrad,
                    margin: 5,
                }),
                makeGoObject(go.TextBlock, "Females", {
                    font: "700 13px Droid Serif, sans-serif",
                })
            ) // end row 2
        )
    );

    // define tooltips for nodes
    const tooltiptemplate = makeGoObject(
        "ToolTip",
        { "Border.fill": "whitesmoke", "Border.stroke": "black" },
        makeGoObject(
            go.TextBlock,
            {
                font: "bold 8pt Helvetica, bold Arial, sans-serif",
                wrap: go.TextBlock.WrapFit,
                margin: 5,
            },
            new go.Binding("text", "", tooltipTextConverter)
        )
    );
    goDiagram.nodeTemplate = makeGoObject(
        go.Node,
        "Auto",
        { deletable: false, toolTip: tooltiptemplate },
        new go.Binding("text", "name"),
        makeGoObject(
            go.Shape,
            "Rectangle",
            {
                fill: "lightGray",
                stroke: null,
                strokeWidth: 0,
                stretch: go.GraphObject.Fill,
                alignment: go.Spot.Center,
            },
            new go.Binding("fill", "gender", genderBrushConverter)
        ),
        makeGoObject(
            go.TextBlock,
            {
                font: "700 12px Droid Serif,sans-serig",
                textAlign: "center",
                margin: 10,
                maxSize: new go.Size(80, NaN),
            },
            new go.Binding("text", "name")
        )
    );
    goDiagram.linkTemplate = makeGoObject(
        go.Link,
        {
            routing: go.Link.Orthogonal,
            corner: 5,
            selectable: false,
        },
        makeGoObject(go.Shape, {
            strokeWidth: 3,
            stroke: "#424242",
        })
    );

    return goDiagram;
}

const DiagramWrapper: React.FC<DiagramWrapperProps> = ({ nodeDataArray }) => {
    const diagramRef = useRef<ReactDiagram>(null);
    return (
        <ReactDiagram
            ref={diagramRef}
            initDiagram={initDiagram}
            divClassName='DiagramWrapper'
            nodeDataArray={nodeDataArray}
        />
    );
};

export default DiagramWrapper;
