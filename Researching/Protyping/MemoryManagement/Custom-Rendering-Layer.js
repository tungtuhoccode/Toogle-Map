map.addLayer({
  id: 'visited-custom',
  type: 'custom',
  renderingMode: '2d',
  onAdd(map, gl) {
    this.prog   = createCircleProgram(gl);
    this.buf    = gl.createBuffer();
  },
  render(gl, matrix) {
    gl.useProgram(this.prog.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
    gl.enableVertexAttribArray(this.prog.a_pos);
    gl.vertexAttribPointer(this.prog.a_pos, 2, gl.FLOAT, false, 0, 0);

    // draw every point in visitedCoords
    visitedCoords.forEach(([lng, lat]) => {
      const p = map.project([lng, lat]);
      gl.uniform2f(this.prog.u_point, p.x, p.y);
      gl.uniformMatrix4fv(this.prog.u_matrix, false, matrix);
      gl.uniform1f(this.prog.u_radius, 4.0);
      gl.drawArrays(gl.POINTS, 0, 1);
    });

    // if you’re still animating, let MapLibre know to call render() again
    if (animating) map.triggerRepaint();
  }
});
