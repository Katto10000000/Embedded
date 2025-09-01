let current_intensity: number;
let current_attack_end: number;
let difficulty: number;
//  setup
let bed_kind = SpriteKind.create()
let bed = sprites.create(assets.image`bed`, bed_kind)
bed.setPosition(85, 50)
bed.setScale(3, ScaleAnchor.Middle)
animation.runImageAnimation(bed, assets.animation`start_anim`, 100, false)
pause(2000)
bed.setPosition(80, 65)
bed.setImage(assets.image`embedded_titlecard`)
pause(2000)
sprites.destroy(bed)
let Player = SpriteKind.Player
let soul = sprites.create(assets.image`soul`, Player)
controller.moveSprite(soul, 70, 70)
let player_health = statusbars.create(80, 4, 4)
player_health.setColor(7, 12)
player_health.setPosition(80, 117)
player_health.max = 500
player_health.value = 500
let invincibility = false
let projectile = SpriteKind.Projectile
let blue_laser = SpriteKind.create()
let orange_laser = SpriteKind.create()
let goober_kind = SpriteKind.create()
let fireball_kind = SpriteKind.create()
soul.setStayInScreen(true)
let debug_mode = false
let anti_tutorial = false
let anti_build = false
let add_round_times = 1
let attack_1 = [0]
let attack_2 = [0]
let attack_3 = [0]
let attack_length = [0]
let attack_intensity = [0]
attack_1.removeElement(0)
attack_2.removeElement(0)
attack_3.removeElement(0)
attack_length.removeElement(0)
attack_intensity.removeElement(0)
if (game.ask("would you like to use", "the level editor") == true) {
    anti_tutorial = true
    game.setDialogTextColor(1)
    game.setDialogFrame(assets.image`build_text_dialogue_frame`)
    game.showLongText("for attacks, enter 0 for nothing, 1 for falling pellets, 2 for sideways pellets, 3 for alternating lasers, 5 for a projectile that follows you, 6,7 and 8 are for blue and red firework attacks", DialogLayout.Full)
    game.showLongText("attack_length is the length of all 3 attacks in a round in seconds", DialogLayout.Bottom)
    game.showLongText("intensity changes how the attack works, it will change the laser speed, change the amount of downwards pellets, change the speed of sideways pellets, make goober chase you faster, and make fireworks spawn more often. The default intensity is 1 ", DialogLayout.Full)
    game.showLongText("for any of those, you can enter 0 for nothing", DialogLayout.Bottom)
    if (game.ask("would you like to", "load your previous build") == true) {
        anti_build = true
        anti_tutorial = true
        attack_1 = database.getListValue("attack_1_database")
        attack_2 = database.getListValue("attack_2_database")
        attack_3 = database.getListValue("attack_3_database")
        attack_length = database.getListValue("attack_length_database")
        attack_intensity = database.getListValue("attack_intensity_database")
        current_intensity = 1
        current_attack_end = 0
        player_health.max = database.getNumberValue("health_max")
        player_health.value = database.getNumberValue("health_value")
    }
    
    if (anti_build == false) {
        player_health.max = game.askForNumber("selects the amount of health the player has", 4)
        player_health.value = player_health.max
        for (let i = 0; i < add_round_times; i++) {
            add_round()
            pause(50)
            if (game.ask("would you like to add", "another round?") == true) {
                add_round_times += 1
            }
            
        }
        current_intensity = 1
        current_attack_end = 0
        attack_1.reverse()
        attack_2.reverse()
        attack_3.reverse()
        attack_length.reverse()
        attack_intensity.reverse()
        database.setList("attack_1_database", attack_1)
        database.setList("attack_2_database", attack_2)
        database.setList("attack_3_database", attack_3)
        database.setList("attack_length_database", attack_length)
        database.setList("attack_intensity_database", attack_intensity)
        database.setNumberValue("health_value", player_health.value)
        database.setNumberValue("health_max", player_health.max)
    }
    
}

browserEvents.H.onEvent(browserEvents.KeyEvent.Pressed, function on_debug_mode_activated() {
    
    soul.setStayInScreen(false)
    debug_mode = true
})
let messages_1 = ["You play as", "try to avoid obstacles", "your health bar will be in", "move through orange lasers", "stay still in blue lasers", "move away from doopliss,", "avoid these i guess", "now retry with", "and whatever you do,"]
let messages_2 = ["a red heart", "by moving around", "the bottom of the screen", "to not take damage", "to not take damage", "he will chase you", "", "another level", "ONLY PLAY LEVELS 1,2,3"]
if (anti_tutorial == false) {
    if (game.ask("    Would you like to", "    do the tutorial?") == false) {
        difficulty = game.askForNumber("select difficulty   1=easy 2=normal 3=hard", 1)
    } else {
        attack_1 = [10, 9, 9, 0, 6, 9, 0, 5, 9, 0, 3, 9, 9, 0, 2, 1, 9, 9, 9]
        attack_2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        attack_3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        attack_length = [0, 0, 0, 6, 8, 0, 3, 12, 0, 6, 10, 0, 0, 4, 8, 15, 0, 0, 0]
        attack_intensity = [0, 8, 7, 1, 1, 6, 1, 1, 5, 1, 1, 4, 3, 1, 1, 1, 2, 1, 0]
        current_intensity = 1
        current_attack_end = 0
    }
    
}

//  Setup attack waves
if (difficulty == 1) {
    player_health.max = 200
    player_health.value = 200
    attack_1 = [0, 3, 3, 1, 8, 2, 1, 1]
    attack_2 = [0, 5, 0, 5, 0, 2, 2, 0]
    attack_3 = [0, 0, 0, 0, 0, 0, 0, 0]
    attack_length = [4, 10, 10, 15, 8, 10, 10, 10]
    attack_intensity = [1, 1, 1, 1, 0.6, 1, 1, 1]
    current_intensity = 1
    current_attack_end = 0
} else if (difficulty == 2) {
    player_health.max = 300
    player_health.value = 300
    attack_1 = [0, 3, 3, 1, 8, 3, 5, 2]
    attack_2 = [0, 5, 1, 5, 1, 2, 2, 2]
    attack_3 = [0, 8, 2, 0, 2, 0, 0, 0]
    attack_length = [4, 8, 10, 8, 12, 10, 10, 10]
    attack_intensity = [1, 1, 1, 1, 1, 1, 1, 1.5]
    current_intensity = 1
    current_attack_end = 0
} else if (difficulty == 3) {
    player_health.max = 400
    player_health.value = 400
    attack_1 = [0, 3, 0, 5, 0, 0, 8, 5, 0, 5, 2]
    attack_2 = [0, 7, 0, 6, 0, 0, 1, 3, 0, 1, 2]
    attack_3 = [0, 3, 0, 2, 3, 0, 2, 2, 0, 1, 2]
    attack_length = [7, 8, 1, 10, 8, 0, 12, 1, 10, 10, 8]
    attack_intensity = [1, 1, 1, 1, 2.3, 1, 1, 1, 1.4, 1.8, 2]
    current_intensity = 1
    current_attack_end = 0
} else if (difficulty != null) {
    game.splash("it's a beautiful", "day outside")
    attack_1 = [3, 1, 8, 2, 3, 2, 3]
    attack_2 = [1, 2, 0, 5, 5, 2, 0]
    attack_3 = [1, 2, 0, 2, 0, 2, 0]
    attack_length = [0.2, 10, 10, 15, 2, 10, 3]
    attack_intensity = [4000, 2, 6, 8, 4, 8, 8]
    current_intensity = 8
    current_attack_end = 0
    game.setGameOverMessage(false, "nyhehehe")
    game.setGameOverMessage(true, "...")
}

// test
// attack_1 =         [9,9,0,2,9,0,1,9]
// attack_2 =         [0,0,0,2,0,0,0,0]
// attack_3 =         [0,0,0,0,0,0,0,0]
// attack_length =    [0.1,0.001,3,10,1,3,10,5]
// attack_intensity = [3,2,1,1,1,1,1,0]
function spawn_pellet_1() {
    let Enemy = SpriteKind.Enemy
    let pellet_1 = sprites.create(assets.image`pellet_1`, Enemy)
    pellet_1.setPosition(randint(3, 157), 0)
    pellet_1.setVelocity(0, 50)
    pellet_1.setFlag(SpriteFlag.AutoDestroy, true)
}

//  stop it slowing right down
function spawn_homing_projectile() {
    let goober = sprites.create(assets.image`goober`, goober_kind)
    if (randint(1, 4) == 1) {
        goober.setPosition(0, 0)
    } else if (randint(1, 4) == 2) {
        goober.setPosition(160, 0)
    } else if (randint(1, 4) == 3) {
        goober.setPosition(0, 120)
    } else {
        goober.setPosition(160, 120)
    }
    
    goober.follow(soul, 20 * current_intensity)
    if (20 * current_intensity > 70) {
        goober.follow(soul, 60)
    }
    
    timer.after(current_attack_end - game.runtime(), function on_after() {
        extraEffects.createSpreadEffectOnAnchor(goober, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Explosion), 100)
        extraEffects.createSpreadEffectOnAnchor(goober, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 100)
        sprites.destroyAllSpritesOfKind(goober_kind)
    })
}

function spawn_orange_laser_1() {
    let orange_laser_1 = sprites.create(assets.image`orange_laser_1`, orange_laser)
    orange_laser_1.setPosition(160, 60)
    orange_laser_1.setVelocity(-50 * current_intensity, 0)
    orange_laser_1.setFlag(SpriteFlag.AutoDestroy, true)
}

//  stop it slowing right down
function spawn_blue_laser_1() {
    let blue_laser_1 = sprites.create(assets.image`blue_laser_1`, blue_laser)
    blue_laser_1.setPosition(160, 60)
    blue_laser_1.setVelocity(-50 * current_intensity, 0)
    blue_laser_1.setFlag(SpriteFlag.AutoDestroy, true)
}

//  stop it slowing right down
function spawn_pellet_3() {
    let Enemy = SpriteKind.Enemy
    let pellet_3 = sprites.create(assets.image`pellet_3`, Enemy)
    if (randint(0, 1) == 0) {
        pellet_3.setPosition(0, randint(5, 115))
        pellet_3.setVelocity(50 * current_intensity, 0)
    } else {
        pellet_3.setPosition(160, randint(10, 110))
        pellet_3.setVelocity(-50 * current_intensity, 0)
    }
    
    pellet_3.setFlag(SpriteFlag.AutoDestroy, true)
}

function spawn_fireball() {
    let fireball = sprites.create(assets.image`fireball`, fireball_kind)
    fireball.setPosition(randint(5, 115), randint(3, 5))
    fireball.setVelocity(randint(70, -70) * current_intensity, randint(60, 69) * current_intensity)
    fireball.setFlag(SpriteFlag.AutoDestroy, true)
    fireball.setFlag(SpriteFlag.Invisible, true)
    extraEffects.createSpreadEffectOnAnchor(fireball, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Explosion), 3000 / current_intensity)
    extraEffects.createSpreadEffectOnAnchor(fireball, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 3000 / current_intensity)
}

// def on_update():
//     if controller.B.is_pressed():
//        spawn_fireball()
// game.on_update(on_update)
game.onUpdate(function on_update_interval() {
    let attack_type: number;
    
    
    if (game.runtime() > current_attack_end) {
        if (attack_1.length == 0) {
            game.gameOver(true)
        }
        
        //  can't pass anything when using time.background for some reason     
        current_intensity = attack_intensity.pop()
        current_attack_end = game.runtime() + attack_length.pop() * 1000
        attack_type = attack_1.pop()
        do_attack(attack_type)
        attack_type = attack_2.pop()
        do_attack(attack_type)
        attack_type = attack_3.pop()
        do_attack(attack_type)
    }
    
    if (player_health.value < 1 && debug_mode == false) {
        game.gameOver(false)
    }
    
})
//  sprite overlaps with otherSprite
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_overlap(sprite: Sprite, otherSprite: Sprite) {
    sprites.destroy(otherSprite)
    player_health.value -= 30
})
sprites.onOverlap(Player, orange_laser, function on_overlap_orange_laser(sprite: Sprite, otherSprite: Sprite) {
    
    if (sprite.vx == 0 && sprite.vy == 0 && invincibility == false) {
        invincibility = true
        player_health.value -= 40
        timer.after(300, function on_after() {
            
            invincibility = false
        })
    }
    
})
sprites.onOverlap(Player, blue_laser, function on_overlap_blue_laser(sprite: Sprite, otherSprite: Sprite) {
    
    if ((sprite.vx > 0 || sprite.vy > 0) && invincibility == false) {
        invincibility = true
        player_health.value -= 40
        timer.after(300, function on_after() {
            
            invincibility = false
        })
    }
    
})
sprites.onOverlap(Player, goober_kind, function on_overlap_goober(sprite: Sprite, otherSprite: Sprite) {
    [otherSprite.follow(null), 0, 0]
    player_health.value -= 40
    animation.runImageAnimation(otherSprite, assets.animation`goober_explode`, 100, false)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Explosion), 100)
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 100)
    pause(800)
    spawn_homing_projectile()
    sprites.destroy(otherSprite)
})
sprites.onOverlap(Player, fireball_kind, function on_overlap_fireball(sprite: Sprite, otherSprite: Sprite) {
    player_health.value -= 20
    sprites.destroy(otherSprite)
})
//  Choose attack
function do_attack(attack_type: number) {
    let line1: string;
    let line2: string;
    if (attack_type == 1) {
        timer.background(function do_attack_falling_pellets() {
            let this_attack_end: number;
            //  current attack end gets changed when the next attack starts - this attack needs to end!
            this_attack_end = current_attack_end
            while (game.runtime() <= this_attack_end) {
                spawn_pellet_1()
                pause(500 / current_intensity)
            }
        })
    }
    
    // do_attack_falling_pellets(a_intensity, a_length)
    if (attack_type == 2) {
        timer.background(function do_attack_sideways_pellets() {
            let this_attack_end: number;
            this_attack_end = current_attack_end
            while (game.runtime() <= this_attack_end) {
                spawn_pellet_3()
                //  move faster with intensity
                pause(500)
            }
        })
    }
    
    if (attack_type == 3) {
        timer.background(function do_alternating_lasers() {
            let this_attack_end: number;
            this_attack_end = current_attack_end
            while (game.runtime() <= this_attack_end) {
                spawn_blue_laser_1()
                //  move faster with intensity
                pause(1000 / current_intensity)
                spawn_orange_laser_1()
                pause(1000 / current_intensity)
            }
        })
    }
    
    if (attack_type == 5) {
        timer.background(spawn_homing_projectile)
    }
    
    if (attack_type == 6) {
        timer.background(function do_fireball_attack_1() {
            let this_attack_end: number;
            this_attack_end = current_attack_end
            while (game.runtime() <= this_attack_end) {
                spawn_fireball()
                spawn_fireball()
                pause(1500 / current_intensity)
                spawn_fireball()
                spawn_fireball()
                pause(2000 / current_intensity)
                spawn_fireball()
            }
        })
    }
    
    if (attack_type == 7) {
        timer.background(function do_fireball_attack_2() {
            let this_attack_end: number;
            this_attack_end = current_attack_end
            while (game.runtime() <= this_attack_end) {
                pause(3000 / current_intensity)
                spawn_fireball()
                pause(200)
                spawn_fireball()
                pause(200)
                spawn_fireball()
                pause(200)
                spawn_fireball()
                pause(200)
                spawn_fireball()
            }
        })
    }
    
    if (attack_type == 8) {
        timer.background(function do_fireball_attack_3() {
            let this_attack_end: number;
            this_attack_end = current_attack_end
            while (game.runtime() <= this_attack_end) {
                pause(400)
                spawn_fireball()
            }
        })
    }
    
    if (attack_type == 9) {
        line1 = messages_1[current_intensity]
        line2 = messages_2[current_intensity]
        if (line2 == "") {
            game.splash(line1)
        } else {
            game.splash(line1, line2)
        }
        
    }
    
    if (attack_type == 10) {
        game.setGameOverMessage(false, "tutorial complete!")
        game.gameOver(false)
    }
    
}

//  Attacks to choose
//  pellets closer together
function add_round() {
    
    
    
    
    
    let current_round = attack_1.length + 1
    let round_attack_1 = game.askForNumber("select one of the attacks        of round " + current_round, 1)
    let round_attack_2 = game.askForNumber("select one of the attacks        of round " + current_round, 1)
    let round_attack_3 = game.askForNumber("select one of the attacks        of round " + current_round, 1)
    let round_length = game.askForNumber("enter the length of round " + current_round + " (in seconds)", 2)
    let round_intensity = game.askForNumber("select the intensity of round " + current_round, 3)
    attack_1.push(round_attack_1)
    attack_2.push(round_attack_2)
    attack_3.push(round_attack_3)
    attack_length.push(round_length)
    attack_intensity.push(round_intensity)
}

