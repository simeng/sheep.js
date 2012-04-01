/**
 * Sheep.exe.js - A reimplementation of sheep.exe in Javascript
 *
 * Initial code made by @graaten
 * Sheep.exe artwork extracted by LiL_Stenly
 * Based on the original Sheep.exe for Windows (16bit) by Tatsutoshi Nomura
 *
 * TODO:
 *  - Alien
 *  - Multiple sheep interactions 
 *  - Flying
 *  - Climbing
 *  - Hang from ledge
 *  - Better mimicing of the original (need 32bit PC to run original)
 *  - Implement options for changing animations / sprite map
 */
var sheep = (function () {
	/* Mapping of supported animations with movement */
	var animations = {
		sleeping: {
			looping: true,
			frames: [ 0, 1 ]
		},
		walking: {
			looping: true,
			frames: [ 2, 3 ],
			movement: { x: -1, y: 0 }
		},
		running: {
			looping: true,
			frames: [ 4, 5 ],
			movement: { x: -2, y: 0 }
		},
		standing: {
			looping: true,
			frames: [ 6 ]
		},
		fall_asleep: {
			looping: false,
			frames: [ 7, 8 ]
		},
		turning_left: {
			looping: false,
			frames: [ 9, 10, 11 ]
		},
		turning_right: {
			looping: false,
			frames: [ 12, 13, 14 ]
		},
		walking_up: {
			looping: true,
			frames: [ 15, 16 ],
			movement: { x: 0, y: -1 }
		},
		running_up: {
			looping: true,
			frames: [ 17, 18 ],
			movement: { x: 0, y: -2 }
		},
		walking_down: {
			looping: true,
			frames: [ 19, 20 ],
			movement: { x: 0, y: 1 }
		},
		running_down: {
			looping: true,
			frames: [ 21, 22 ],
			movement: { x: 0, y: 2 }
		},
		flying_w: {
			looping: false,
			frames: [ 23 ],
			movement: { x: -2, y: 0 }
		},
		flying_sw: {
			looping: false,
			frames: [ 24 ],
			movement: { x: -2, y: 2 }
		},
		flying_s: {
			looping: false,
			frames: [ 25 ],
			movement: { x: 0, y: 2 }
		},
		flying_se: {
			looping: false,
			frames: [ 26 ],
			movement: { x: 2, y: 2 }
		},
		flying_e: {
			looping: false,
			frames: [ 27 ],
			movement: { x: 2, y: 0 }
		},
		flying_ne: {
			looping: false,
			frames: [ 28 ],
			movement: { x: 2, y: -2 }
		},
		flying_n: {
			looping: false,
			frames: [ 29 ],
			movement: { x: 0, y: -2 }
		},
		flying_nw: {
			looping: false,
			frames: [ 30 ],
			movement: { x: -2, y: -2 }
		},
		sitting: {
			looping: false,
			frames: [ 31 ]
		},
		sitting_falling_asleep: {
			looping: false,
			frames: [ 32, 33 ]
		},
		staring: {
			looping: false,
			frames: [ 34 ]
		},
		staring_falling_asleep: {
			looping: false,
			frames: [ 35, 36 ]
		},
		yawning_start: {
			looping: false,
			frames: [ 37, 38, 39 ]
		},
		yawning_end: {
			looping: false,
			frames: [ 38, 37 ]
		},
		dangling_side: {
			looping: true,
			frames: [ 40, 41 ]
		},
		dangling_front: {
			looping: true,
			frames: [ 42, 43, 42, 44 ]
		},
		fell_down_side: {
			looping: false,
			frames: [ 45 ]
		},
		dangling_front_worried: {
			looping: true,
			frames: [ 46, 47 ]
		},
		fell_down_front: {
			looping: false,
			frames: [ 48 ]
		},
		hiding: {
			looping: false,
			frames: [ 49 ]
		},
		cannot_believe: {
			looping: true,
			frames: [ 50, 51 ]
		},
		stand_on_two_side: {
			looping: true,
			frames: [ 52, 53 ]
		},
		stand_on_two_front: {
			looping: true,
			frames: [ 54, 55 ]
		},
		sad: {
			looping: true,
			frames: [ 56, 57 ]
		},
		open_mouth: {
			looping: false,
			frames: [ 58, 59 ]
		},
		close_mouth: {
			looping: false,
			frames: [ 59, 58 ]
		},
		chewing: {
			looping: true,
			frames: [ 60, 61 ]
		},
		squished: {
			looping: false,
			frames: [ 62 ]
		},
		dead_nw: {
			looping: false,
			frames: [ 63 ]
		},
		dead_n: {
			looping: false,
			frames: [ 64 ]
		},
		dead_ne: {
			looping: false,
			frames: [ 65 ]
		},
		dead_e: {
			looping: false,
			frames: [ 66 ]
		},
		dead_se: {
			looping: false,
			frames: [ 67 ]
		},
		dead_s: {
			looping: false,
			frames: [ 68 ]
		},
		dead_sw: {
			looping: false,
			frames: [ 69 ]
		},
		dead_w: {
			looping: false,
			frames: [ 70 ]
		},
		falling: {
			looping: true,
			frames: [ 70, 69, 68, 67, 66, 65, 64, 63 ],
			movement: { x: 0, y: 2 }
		},
		gasp_up: {
			looping: true,
			frames: [ 71, 72 ]
		},
		stare_up: {
			looping: false,
			frames: [ 73 ]
		},
		fall_asleep_up: {
			looping: false,
			frames: [ 74, 75 ]
		},
		pee_start: {
			looping: false,
			frames: [ 103, 104 ],
		},
		peeing: {
			looping: true,
			frames: [ 105, 106 ],
		},
		pee_stop: {
			looping: false,
			frames: [ 104, 103 ],
		},
		prosit: {
			looping: false,
			frames: [ 107, 108, 109, 110, 111 ],
		},
		roll_over: {
			looping: false,
			frames: [ 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 6 ],
			movement: { x: 1, y: 0 }
		},
		blush: {
			looping: false,
			frames: [ 127, 128, 129, 130 ]
		},
		entering_atmosphere: {
			looping: false,
			frames: [ 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145 ],
			movement: { x: -5, y: 5 }
		},
	};
	/* used to calculate frame numbers from the sprite */
	var sprite_map = {
		sprite_width: 40,
		sprite_height: 40,
		num_horizontal: 16,
		num_vertical: 12,
		start_offset: 16
	}


	var sheep = {
		/* entering_atmosphere will fly in diagonally from top right of screen */
		active_animation: 'entering_atmosphere',
		current_frame: 0,
		/* animation speed */
		speed: 0.3,
		/* Start right outside browser diagonally aimed for a landing spot */
		position: { x: 100, y: 100 },
		width: 40,
		height: 40,
		/* automatic switching between movement modes */
		auto_move: true,
		/* Delay before a new automove can activate */
		auto_move_delay: 2000, 
		last_auto_move: (new Date()).getTime()
	};

	var last_timestamp = (new Date()).getTime();
	var display = null;
	var floors = null;

	/**
	  * Fetches a couple of flat lines the sheep can walk on
	  */
	function getFloors(selector) {
		var items = [];
		for (i in selector) { 
			var elem = selector[i];
			if (typeof(elem) !== "object")
				continue;
			items.push({ x1: elem.offsetLeft, y1: elem.offsetTop, x2: elem.offsetLeft+elem.offsetWidth, y2: elem.offsetTop }); 
		};
		return items;
	}

	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
		      window.webkitRequestAnimationFrame || 
		      window.mozRequestAnimationFrame    || 
		      window.oRequestAnimationFrame      || 
		      window.msRequestAnimationFrame     || 
		      function( callback ){
			window.setTimeout(callback, 1000 / 60);
		      };
	})();


	function render() {
		var anim = animations[sheep.active_animation];

		/* Timing */
		var now = (new Date()).getTime();
		var dt = (now - last_timestamp) / 30;
		last_timestamp = now;

		/* Move if moving */
		if ("movement" in anim) {
			sheep.position.x += anim.movement.x * dt;
			sheep.position.y += anim.movement.y * dt;

			/* Check for collision */
			var switch_anim = null;
			for (k in floors) {
				var f = floors[k];
				if (typeof(f) != "object")
					continue;

				if (sheep.position.y >= f.y1 && sheep.position.y - 4 < f.y1) {
					if (sheep.position.x + sheep.width > f.x1 && sheep.position.x < f.x2) {
						/* Check for falling / downward travel */
						if (anim.movement.y > 0) {
							/* TODO: check for what active was and choose acordingly */
							switch_anim = 'fell_down_side';
							break;
						}
					}
					else {
						if (sheep.active_animation == 'running' || 
								sheep.active_animation == 'walking' || 
								sheep.active_animation == 'roll_over') {
							switch_anim = 'falling';
							break;
						}
					}
				}
			}
			if (switch_anim !== null) {
				sheep.active_animation = switch_anim;
				sheep.current_frame = 0;
			}
		}
		display.style.left = sheep.position.x + "px";
		display.style.top = sheep.position.y - display.clientWidth + "px";
	}

	function animateSprite() {
		var now = (new Date()).getTime();
		var anim = animations[sheep.active_animation];

		if (sheep.auto_move && (now - sheep.last_auto_move) > sheep.auto_move_delay) {
			var rnd = Math.random();
			if (!("movement" in anim)) {
				var possible_animations = [ 'walking', 'running', 'sad', 
				    'chewing', 'staring', 'stand_on_two_side', 'stand_on_two_front', 
				    'yawning_start', 'prosit', 'roll_over' ];
				// Keep some "do nothing" choices also (+5)
				var i = Math.floor(rnd * (possible_animations.length + 5));
				if (i < possible_animations.length) {
					sheep.active_animation = possible_animations[i];
					sheep.current_frame = 0;
				}
				sheep.last_auto_move = (new Date).getTime();
			}
			else {
				if (anim.movement.y == 0) {
					if (rnd > 0 && rnd < 0.2) {
						sheep.active_animation = 'stare_up';
						sheep.last_auto_move = (new Date).getTime();
					}
				}
			}
		}

		anim = animations[sheep.active_animation];

		setAnimationFrame(anim.frames[sheep.current_frame]);

		if (sheep.current_frame >= anim.frames.length - 1) {
			if (anim.looping) {
				sheep.current_frame = 0;
			}
		}
		else {
			sheep.current_frame += 1;
		}
	}

	function setAnimationFrame(frame_id) {
		var id = frame_id + sprite_map.start_offset;
		var x = (id % sprite_map.num_horizontal) * sprite_map.sprite_width;
		var y = Math.floor(id / sprite_map.num_horizontal) * sprite_map.sprite_height;
		display.style.backgroundPosition = "-" + x + "px -" + y + "px";
	}

	function create_sheep(selector) {
		if (typeof(selector) === "undefined")
			selector = "div";
		floors = getFloors(document.querySelectorAll(selector));

		var rndfloor = floors[Math.floor(Math.random() * floors.length)];
		sheep.position = { 
			x: rndfloor.x1 + 
				   ((rndfloor.x2-rndfloor.x1-sheep.width) / 2) +
				   rndfloor.y1, 
			y: rndfloor.y1 - rndfloor.y1
		}

		display = document.createElement("div");
		display.setAttribute("class", "display");
		display.style.position = "absolute";
		display.style.background = "url(sheep.exe.gif)";
		display.style.width = sheep.width + "px";
		display.style.height = sheep.height + "px";
		document.body.appendChild(display);

		animateSprite();
		setInterval(animateSprite, sheep.speed*1000);

		(function animloop() {
			requestAnimFrame(animloop);
			render();
		})();

		return sheep;
	}

	return create_sheep;
})();

