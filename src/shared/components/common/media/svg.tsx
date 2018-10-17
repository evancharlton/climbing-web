import React from 'react';
import { parseSVG, makeAbsolute } from 'svg-path-parser';
import { getImageUrl } from '../../../api';
import { RouteComponentProps, withRouter } from 'react-router';

interface SvgProps extends RouteComponentProps<any> {
  style: any,
  close?: Function,
  m: any
}

const Svg: React.SFC<SvgProps> = props => {
  function generateShapes(svgs, svgProblemId, w, h) {
    return svgs.map((svg, key) => {
      const path: any = parseSVG(svg.path);
      makeAbsolute(path); // Note: mutates the commands in place!
      var ixNr;
      var maxY = 0;
      var ixAnchor;
      var minY = 99999999;
      for (var i=0, len=path.length; i < len; i++) {
        if (path[i].y > maxY) {
          ixNr = i;
          maxY = path[i].y;
        }
        if (path[i].y < minY) {
          ixAnchor = i;
          minY = path[i].y;
        }
      }
      var x = path[ixNr].x;
      var y = path[ixNr].y;
      const r = 0.012*w;
      if (x < r) x = r;
      if (x > (w-r)) x = w-r;
      if (y < r) y = r;
      if (y > (h-r)) y = h-r;
      var anchor = null;
      if (svg.hasAnchor) {
        anchor = <circle className="buldreinfo-svg-ring" cx={path[ixAnchor].x} cy={path[ixAnchor].y} r={0.006*w}/>
      }
      return (
        <g className={"buldreinfo-svg-pointer buldreinfo-svg-hover" + ((svgProblemId===0 || svg.problemId===svgProblemId)? "" : " buldreinfo-svg-opacity")} key={key} style={props.style} onClick={() => {
          if (props.close) {
            props.history.push("/problem/" + svg.problemId);
            props.close();
          }
        }}>
          <path d={svg.path} className="buldreinfo-svg-route" strokeWidth={0.003*w} strokeDasharray={0.006*w}/>
          <circle className="buldreinfo-svg-ring" cx={x} cy={y} r={r}/>
          <text className="buldreinfo-svg-routenr" x={x} y={y} fontSize={0.02*w} dy=".3em">{svg.nr}</text>
          {anchor}
        </g>
      );
    });
  }

  return (
    <>
      <canvas className="buldreinfo-svg-canvas-ie-hack" width={props.m.width} height={props.m.height} style={props.style}></canvas>
      <svg className="buldreinfo-svg" viewBox={"0 0 " + props.m.width + " " + props.m.height} preserveAspectRatio="xMidYMid meet">
        <image xlinkHref={getImageUrl(props.m.id)} width="100%" height="100%"/>
        {generateShapes(props.m.svgs, props.m.svgProblemId, props.m.width, props.m.height)}
      </svg>
    </>
  )
}

export default withRouter(Svg);
