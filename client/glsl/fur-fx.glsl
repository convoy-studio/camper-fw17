uniform sampler2D hairMap;
uniform sampler2D colorMap;
uniform vec3 color;
uniform float offset;

varying vec3 vNormal;

varying vec2 vUv;

void main() {

	vec2 scale = vec2(0.2, 0.2);
	vec4 hairColor = texture2D(hairMap, vec2(vUv.s, vUv.t));
	vec4 col = texture2D(colorMap, vec2(vUv.s*scale.x, vUv.t*scale.y));

	// discard no hairs + above the max length
	if (hairColor.a <= 0.0 || hairColor.g < offset) {
		discard;
	}

	// darker towards bottom of the hair
	float shadow = mix(0.0,hairColor.b*1.2,offset);

	// light
	vec3 light = vec3(1.1,1.0,0.5);
	float d = pow(max(0.45,dot(vNormal.xyz, light))*1.9, 1.4);

	gl_FragColor = vec4(color*col.xyz*d*shadow, 1.1-offset);

}