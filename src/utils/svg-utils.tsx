import React from "react";
import { parseSVG, makeAbsolute } from "svg-path-parser";
import { svgPathProperties } from "svg-path-properties";

type DescentProps = {
  path: React.SVGProps<SVGPathElement>["d"];
  whiteNotBlack: boolean;
  scale: number;
  thumb: boolean;
};

export function Descent({ path, whiteNotBlack, scale, thumb }: DescentProps) {
  const properties = new svgPathProperties(path);
  const descentKey = path.replace(/\s/g, ""); // Key cannot contains spaces
  const deltaPercent = (scale / properties.getTotalLength()) * (thumb ? 3 : 2);
  const texts: JSX.Element[] = [];
  for (let i = 0; i <= 100; i += deltaPercent) {
    texts.push(
      <textPath
        key={i}
        xlinkHref={"#descent" + descentKey}
        startOffset={i + "%"}
      >
        ➤
      </textPath>,
    );
  }
  const fontSize = 0.012 * scale * (thumb ? 2 : 1);
  return (
    <g opacity={0.9} key={path}>
      <path
        id={"descent" + descentKey}
        style={{ fill: "none" }}
        strokeWidth={0}
        d={path}
      />
      <text
        fontSize={fontSize}
        fontWeight="bolder"
        style={{
          fill: whiteNotBlack ? "black" : "white",
          dominantBaseline: "central",
        }}
      >
        {texts}
      </text>
      <text
        fontSize={fontSize}
        style={{
          fill: whiteNotBlack ? "white" : "black",
          dominantBaseline: "central",
        }}
      >
        {texts}
      </text>
    </g>
  );
}

type AnchorProps = Pick<
  React.SVGProps<SVGCircleElement>,
  "strokeWidth" | "stroke"
> & { bolted: boolean; r: number; x: number; y: number };

function Anchor({ strokeWidth, r, x, y, bolted, stroke }: AnchorProps) {
  return (
    <g opacity={0.9}>
      {bolted ? (
        <circle
          strokeLinecap="round"
          cx={x}
          cy={y}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          stroke={stroke}
        />
      ) : (
        <>
          <line
            strokeLinecap="round"
            x1={x - r}
            y1={y - r}
            x2={x + r}
            y2={y - r}
            strokeWidth={strokeWidth}
            stroke={stroke}
          />
          <line
            strokeLinecap="round"
            x1={x - r}
            y1={y - r}
            x2={x}
            y2={y + r * 0.8}
            strokeWidth={strokeWidth}
            stroke={stroke}
          />
          <line
            strokeLinecap="round"
            x1={x + r}
            y1={y - r}
            x2={x}
            y2={y + r * 0.8}
            strokeWidth={strokeWidth}
            stroke={stroke}
          />
        </>
      )}
      <line
        strokeLinecap="round"
        x1={x}
        y1={y + r}
        x2={x}
        y2={y + r + r + r}
        strokeWidth={strokeWidth}
        stroke={stroke}
      />
      <line
        strokeLinecap="round"
        x1={x - r}
        y1={y + r + r}
        x2={x}
        y2={y + r + r + r}
        strokeWidth={strokeWidth}
        stroke={stroke}
      />
      <line
        strokeLinecap="round"
        x1={x + r}
        y1={y + r + r}
        x2={x}
        y2={y + r + r + r}
        strokeWidth={strokeWidth}
        stroke={stroke}
      />
    </g>
  );
}

type RappelProps = Omit<AnchorProps, "r"> & {
  scale: number;
  backgroundColor: string;
  thumb: boolean;
  color: string;
};

export function Rappel({
  x,
  y,
  bolted,
  scale,
  thumb,
  backgroundColor,
  color,
}: RappelProps) {
  const strokeWidth = 0.0015 * scale * (thumb ? 2 : 1);
  const r = 0.005 * scale * (thumb ? 2 : 1);
  return (
    <g key={[x, y, bolted].join("/")}>
      {Anchor({
        strokeWidth: strokeWidth * 2,
        r,
        x,
        y,
        bolted,
        stroke: backgroundColor,
      })}
      {Anchor({ strokeWidth, r, x, y, bolted, stroke: color })}
    </g>
  );
}

export function parsePath(d: string) {
  let res: any[] = [];
  if (d) {
    const commands: any = parseSVG(d);
    makeAbsolute(commands); // Note: mutates the commands in place!
    res = commands.map((c) => {
      switch (c.code) {
        case "L":
        case "M":
          return { x: Math.round(c.x), y: Math.round(c.y) };
        case "C":
          return {
            x: Math.round(c.x),
            y: Math.round(c.y),
            c: [
              { x: Math.round(c.x1), y: Math.round(c.y1) },
              { x: Math.round(c.x2), y: Math.round(c.y2) },
            ],
          };
        case "S":
          return {
            x: Math.round(c.x),
            y: Math.round(c.y),
            c: [
              { x: Math.round(c.x0), y: Math.round(c.y0) },
              { x: Math.round(c.x2), y: Math.round(c.y2) },
            ],
          };
      }
    });
    // Reverse path if drawn incorrect direction
    if (res.length >= 2 && res[0].y < res[res.length - 1].y) {
      const tmp: any[] = [];
      for (let i = res.length - 1; i >= 0; i--) {
        const p = res[i];
        const prevP = i != res.length - 1 && res[i + 1];
        if (prevP?.c) {
          tmp.push({
            x: p.x,
            y: p.y,
            c: [
              { x: prevP.c[1].x, y: prevP.c[1].y },
              { x: prevP.c[0].x, y: prevP.c[0].y },
            ],
          });
        } else {
          tmp.push({ x: p.x, y: p.y });
        }
      }
      res = tmp;
    }
  }
  return res;
}

type SvgType = {
  path: string;
  anchors: { x: number; y: number }[];
  nr: number;
  hasAnchor: boolean;
} & (
  | { t: "PATH" }
  | (({ t: "RAPPEL_BOLTED" } | { t: "RAPPEL_NOT_BOLTED" }) & {
      rappelX: number;
      rappelY: number;
    })
  | { t: "other" }
);

export function parseReadOnlySvgs(
  readOnlySvgs: SvgType[],
  w: number,
  h: number,
  minWindowScale: number,
) {
  const backgroundColor = "black";
  const color = "white";
  const scale = Math.max(w, h, minWindowScale);
  const shapes = readOnlySvgs.reduce<JSX.Element[]>((acc, svg) => {
    const { t } = svg;
    switch (t) {
      case "PATH": {
        return [
          ...acc,
          <Descent
            key={svg.path}
            path={svg.path}
            whiteNotBlack={true}
            scale={scale}
            thumb={false}
          />,
        ];
      }
      case "RAPPEL_BOLTED":
      case "RAPPEL_NOT_BOLTED": {
        return [
          ...acc,
          <Rappel
            key={[svg.rappelX, svg.rappelY].join("x")}
            x={svg.rappelX}
            y={svg.rappelY}
            bolted={t === "RAPPEL_BOLTED"}
            scale={scale}
            thumb={false}
            backgroundColor={backgroundColor}
            color={color}
          />,
        ];
      }
      default: {
        return [
          ...acc,
          <path
            key={svg.path}
            d={svg.path}
            className={"buldreinfo-svg-edit-opacity"}
            style={{ fill: "none", stroke: "#000000" }}
            strokeWidth={0.003 * w}
            strokeDasharray={0.006 * w}
          />,
          ...svg.anchors.map((a) => (
            <circle
              key={`${a.x}x${a.y}`}
              className="buldreinfo-svg-edit-opacity"
              fill="#000000"
              cx={a.x}
              cy={a.y}
              r={0.006 * w}
            />
          )),
        ];
      }
    }
  }, []);
  return shapes;
}
