# setup
bed_kind = SpriteKind.create()
bed = sprites.create(assets.image("bed"), bed_kind)
bed.set_position(85, 50)
bed.set_scale(3, ScaleAnchor.MIDDLE)
animation.run_image_animation(bed, assets.animation("start_anim"), 100, False)
pause(2000)
bed.set_position(80, 65)
bed.set_image(assets.image("embedded_titlecard"))
pause(2000)
sprites.destroy(bed)
Player = SpriteKind.player
soul = sprites.create(assets.image("soul"), Player)
controller.move_sprite(soul, 70, 70)
player_health = statusbars.create(80, 4, 4)
player_health.set_color(7, 12)
player_health.set_position(80, 117)
player_health.max = 500
player_health.value = 500
invincibility = False
projectile = SpriteKind.projectile
blue_laser = SpriteKind.create()
orange_laser = SpriteKind.create()
goober_kind = SpriteKind.create()
fireball_kind = SpriteKind.create()
soul.set_stay_in_screen(True)
debug_mode = False
anti_tutorial = False
anti_build = False
add_round_times = 1

attack_1 =         [0]
attack_2 =         [0]
attack_3 =         [0]
attack_length =    [0]
attack_intensity = [0]
attack_1.remove_element(0)
attack_2.remove_element(0)
attack_3.remove_element(0)
attack_length.remove_element(0)
attack_intensity.remove_element(0)

if game.ask("would you like to use", "the level editor") == True:
    anti_tutorial = True
    game.set_dialog_text_color(1)
    game.set_dialog_frame(assets.image("build_text_dialogue_frame"))
    game.show_long_text("for attacks, enter 0 for nothing, 1 for falling pellets, 2 for sideways pellets, 3 for alternating lasers, 5 for a projectile that follows you, 6,7 and 8 are for blue and red firework attacks", DialogLayout.FULL)
    game.show_long_text("attack_length is the length of all 3 attacks in a round in seconds", DialogLayout.BOTTOM)
    game.show_long_text("intensity changes how the attack works, it will change the laser speed, change the amount of downwards pellets, change the speed of sideways pellets, make goober chase you faster, and make fireworks spawn more often. The default intensity is 1 ", DialogLayout.FULL)
    game.show_long_text("for any of those, you can enter 0 for nothing", DialogLayout.BOTTOM)
    if game.ask("would you like to", "load your previous build") == True:
        anti_build = True
        anti_tutorial = True

        attack_1 = database.get_list_value("attack_1_database")
        attack_2 = database.get_list_value("attack_2_database")
        attack_3 = database.get_list_value("attack_3_database")
        attack_length = database.get_list_value("attack_length_database")
        attack_intensity = database.get_list_value("attack_intensity_database")
        current_intensity = 1
        current_attack_end = 0
        player_health.max = database.get_number_value("health_max")
        player_health.value = database.get_number_value("health_value")

    if anti_build == False:

        player_health.max = game.ask_for_number("selects the amount of health the player has", 4)
        player_health.value = player_health.max

        for i in range(add_round_times):
            add_round()
            pause(50)
            if game.ask("would you like to add", "another round?") == True:
                add_round_times += 1

        current_intensity = 1
        
        current_attack_end = 0
        attack_1.reverse()
        attack_2.reverse()
        attack_3.reverse()
        attack_length.reverse()
        attack_intensity.reverse()

        database.set_list("attack_1_database", attack_1)
        database.set_list("attack_2_database", attack_2)
        database.set_list("attack_3_database", attack_3)
        database.set_list("attack_length_database", attack_length)
        database.set_list("attack_intensity_database", attack_intensity)
        database.set_number_value("health_value", player_health.value)
        database.set_number_value("health_max", player_health.max)

def on_debug_mode_activated():
    global debug_mode
    soul.set_stay_in_screen(False)
    debug_mode = True
browserEvents.H.on_event(browserEvents.KeyEvent.PRESSED, on_debug_mode_activated)

messages_1 = [
    "You play as",
    "try to avoid obstacles",
    "your health bar will be in",
    "move through orange lasers",
    "stay still in blue lasers",
    "move away from doopliss,",
    "avoid these i guess",
    "now retry with",
    "and whatever you do,",
]
messages_2 = [
    "a red heart",
    "by moving around",
    "the bottom of the screen",
    "to not take damage",
    "to not take damage",
    "he will chase you",
    "",
    "another level",
    "ONLY PLAY LEVELS 1,2,3",
]
if anti_tutorial == False:
    if game.ask("    Would you like to", "    do the tutorial?") == False:
        difficulty = game.ask_for_number("select difficulty   1=easy 2=normal 3=hard", 1)
    else:
        attack_1 =         [10,9,9,0,6,9,0,5,9,0,3,9,9,0,2,1,9,9,9]
        attack_2 =         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        attack_3 =         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        attack_length =    [0,0,0,6,8,0,3,12,0,6,10,0,0,4,8,15,0,0,0]
        attack_intensity = [0,8,7,1,1,6,1,1,5,1,1,4,3,1,1,1,2,1,0]
        current_intensity = 1
        current_attack_end = 0

# Setup attack waves

if difficulty == 1:
    player_health.max = 200
    player_health.value = 200
    
    attack_1 =         [0, 3,  3,  1,  8,  2,  1,  1]
    attack_2 =         [0, 5,  0,  5,  0,  2,  2,  0]
    attack_3 =         [0, 0,  0,  0,  0,  0,  0,  0]
    attack_length =    [4, 10, 10, 15, 8,  10, 10, 10]
    attack_intensity = [1, 1,  1,  1, 0.6, 1,  1,  1]
    current_intensity = 1
    current_attack_end = 0

elif difficulty == 2:
    player_health.max = 300
    player_health.value = 300

    attack_1 =         [0, 3,  3,  1,  8,  3,  5,2]
    attack_2 =         [0, 5,  1,  5,  1,  2,  2,2]
    attack_3 =         [0, 8,  2,  0,  2,  0,  0,0]
    attack_length =    [4, 8, 10, 8, 12,  10, 10, 10]
    attack_intensity = [1, 1,  1,  1, 1, 1,  1,  1.5]
    current_intensity = 1
    current_attack_end = 0

elif difficulty == 3:
    player_health.max = 400
    player_health.value = 400

    attack_1 =         [0, 3,0,  5,  0, 0, 8,  5,  0,5,2]
    attack_2 =         [0, 7,0,  6,  0, 0, 1,  3,  0,1,2]
    attack_3 =         [0, 3,0,  2,  3, 0, 2,  2,  0,1,2]
    attack_length =    [7, 8,1, 10,  8, 0,  12,  1,10, 10, 8]
    attack_intensity = [1, 1,1,  1,  2.3,1, 1, 1,1.4,1.8,2]
    current_intensity = 1
    current_attack_end = 0

elif difficulty != None:
    game.splash("it's a beautiful", "day outside")
    attack_1 = [3,  1, 8, 2,  3,  2,  3]
    attack_2 = [1,  2, 0, 5,  5,  2,  0]
    attack_3 = [1,  2, 0, 2,  0,  2,  0]
    attack_length =[0.2, 10, 10, 15, 2, 10, 3]
    attack_intensity = [4000, 2, 6,  8,  4, 8,  8]
    current_intensity = 8
    current_attack_end = 0
    game.set_game_over_message(False, "nyhehehe")
    game.set_game_over_message(True, "...")

#test
#attack_1 =         [9,9,0,2,9,0,1,9]
#attack_2 =         [0,0,0,2,0,0,0,0]
#attack_3 =         [0,0,0,0,0,0,0,0]
#attack_length =    [0.1,0.001,3,10,1,3,10,5]
#attack_intensity = [3,2,1,1,1,1,1,0]

def spawn_pellet_1():
    Enemy = SpriteKind.enemy
    pellet_1 = sprites.create(assets.image("pellet_1"), Enemy)
    pellet_1.set_position(randint(3, 157), 0)
    pellet_1.set_velocity(0, 50)
    pellet_1.set_flag(SpriteFlag.AUTO_DESTROY, True) # stop it slowing right down

def spawn_homing_projectile():
    goober = sprites.create(assets.image("goober"), goober_kind)
    if randint(1, 4) == 1:
        goober.set_position(0, 0)
    elif randint(1, 4) == 2:
        goober.set_position(160, 0)
    elif randint(1, 4) == 3:
        goober.set_position(0, 120)
    else:
        goober.set_position(160, 120)
    goober.follow(soul, (20*current_intensity))
    if 20*current_intensity > 70:
        goober.follow(soul, 60)
    def on_after():
        extraEffects.create_spread_effect_on_anchor(goober, extraEffects.create_single_color_spread_effect_data(2, ExtraEffectPresetShape.EXPLOSION), 100)
        extraEffects.create_spread_effect_on_anchor(goober, extraEffects.create_single_color_spread_effect_data(3, ExtraEffectPresetShape.EXPLOSION), 100)
        sprites.destroy_all_sprites_of_kind(goober_kind)
    timer.after(current_attack_end - game.runtime(), on_after)

def spawn_orange_laser_1():
    orange_laser_1 = sprites.create(assets.image("orange_laser_1"), orange_laser)
    orange_laser_1.set_position(160, 60)
    orange_laser_1.set_velocity((-50)*current_intensity, 0)
    orange_laser_1.set_flag(SpriteFlag.AUTO_DESTROY, True) # stop it slowing right down

def spawn_blue_laser_1():
    blue_laser_1 = sprites.create(assets.image("blue_laser_1"), blue_laser)
    blue_laser_1.set_position(160, 60)
    blue_laser_1.set_velocity((-50)*current_intensity, 0) 
    blue_laser_1.set_flag(SpriteFlag.AUTO_DESTROY, True) # stop it slowing right down

def spawn_pellet_3():
    Enemy = SpriteKind.enemy
    pellet_3 = sprites.create(assets.image("pellet_3"), Enemy)
    if randint(0, 1) == 0:
        pellet_3.set_position(0, (randint(5, 115)))
        pellet_3.set_velocity(50*current_intensity, 0)
    else:
        pellet_3.set_position(160, (randint(10, 110)))
        pellet_3.set_velocity(-50*current_intensity, 0)
    pellet_3.set_flag(SpriteFlag.AUTO_DESTROY, True)

def spawn_fireball():
    fireball = sprites.create(assets.image("fireball"), fireball_kind)
    fireball.set_position(randint(5, 115), (randint(3, 5)))
    fireball.set_velocity(randint(70, -70)*current_intensity, randint(60, 69)*current_intensity)
    fireball.set_flag(SpriteFlag.AUTO_DESTROY, True)
    fireball.set_flag(SpriteFlag.INVISIBLE, True)
    extraEffects.create_spread_effect_on_anchor(fireball, extraEffects.create_single_color_spread_effect_data(2, ExtraEffectPresetShape.EXPLOSION), 3000/current_intensity)
    extraEffects.create_spread_effect_on_anchor(fireball, extraEffects.create_single_color_spread_effect_data(3, ExtraEffectPresetShape.EXPLOSION), 3000/current_intensity)

#def on_update():
#    if controller.B.is_pressed():
#       spawn_fireball()
#game.on_update(on_update)

def on_update_interval():
    global current_intensity
    global current_attack_end
    if game.runtime() > current_attack_end:
        if len(attack_1) == 0:
            game.game_over(True)
        # can't pass anything when using time.background for some reason     
        current_intensity = attack_intensity.pop()
        current_attack_end = game.runtime() + (attack_length.pop() * 1000)
        attack_type = attack_1.pop()
        do_attack(attack_type)
        attack_type = attack_2.pop()
        do_attack(attack_type)
        attack_type = attack_3.pop()
        do_attack(attack_type)
    if player_health.value < 1 and debug_mode == False:
        game.game_over(False)
game.on_update(on_update_interval)

# sprite overlaps with otherSprite

def on_overlap(sprite, otherSprite):
    sprites.destroy(otherSprite)
    player_health.value -= 30
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_overlap)

def on_overlap_orange_laser(sprite, otherSprite):
    global invincibility
    if sprite.vx == 0 and sprite.vy == 0 and invincibility == False:
        invincibility = True
        player_health.value -= 40
        def on_after():
            global invincibility
            invincibility = False
        timer.after(300, on_after)
sprites.on_overlap(Player, orange_laser, on_overlap_orange_laser)

def on_overlap_blue_laser(sprite, otherSprite):
    global invincibility
    if (sprite.vx > 0 or sprite.vy > 0) and invincibility == False:
        invincibility = True
        player_health.value -= 40
        def on_after():
            global invincibility
            invincibility = False
        timer.after(300, on_after)
sprites.on_overlap(Player, blue_laser, on_overlap_blue_laser)

def on_overlap_goober(sprite, otherSprite):
    otherSprite.follow(None), 0, 0
    player_health.value -= 40
    animation.run_image_animation(otherSprite, assets.animation("goober_explode"), 100, False)
    extraEffects.create_spread_effect_on_anchor(otherSprite, extraEffects.create_single_color_spread_effect_data(2, ExtraEffectPresetShape.EXPLOSION), 100)
    extraEffects.create_spread_effect_on_anchor(otherSprite, extraEffects.create_single_color_spread_effect_data(3, ExtraEffectPresetShape.EXPLOSION), 100)
    pause(800)
    spawn_homing_projectile()
    sprites.destroy(otherSprite)
sprites.on_overlap(Player, goober_kind, on_overlap_goober)

def on_overlap_fireball(sprite, otherSprite):
    player_health.value -= 20
    sprites.destroy(otherSprite)

sprites.on_overlap(Player, fireball_kind, on_overlap_fireball)

# Choose attack
def do_attack(attack_type):
    if attack_type == 1:
        timer.background(do_attack_falling_pellets)
        #do_attack_falling_pellets(a_intensity, a_length)
    if attack_type == 2:
        timer.background(do_attack_sideways_pellets)
    if attack_type == 3:
        timer.background(do_alternating_lasers)
    if attack_type == 5:
        timer.background(spawn_homing_projectile)
    if attack_type == 6:
        timer.background(do_fireball_attack_1)
    if attack_type == 7:
        timer.background(do_fireball_attack_2)
    if attack_type == 8:
        timer.background(do_fireball_attack_3)
    if attack_type == 9:
        line1 = messages_1[current_intensity]
        line2 = messages_2[current_intensity]
        if line2 == "":
            game.splash(line1)
        else:
            game.splash(line1,line2)
    if attack_type == 10:
        game.set_game_over_message(False, "tutorial complete!")
        game.game_over(False)

# Attacks to choose
def do_attack_falling_pellets():
    # current attack end gets changed when the next attack starts - this attack needs to end!
    this_attack_end = current_attack_end
    while game.runtime() <= this_attack_end:
        spawn_pellet_1()
        pause(500/current_intensity) # pellets closer together

def do_attack_sideways_pellets():
    this_attack_end = current_attack_end
    while game.runtime() <= this_attack_end:
        spawn_pellet_3() # move faster with intensity
        pause(500)

def do_alternating_lasers():
    this_attack_end = current_attack_end
    while game.runtime() <= this_attack_end:
        spawn_blue_laser_1() # move faster with intensity
        pause(1000/current_intensity)
        spawn_orange_laser_1()
        pause(1000/current_intensity)

def do_fireball_attack_1():
    this_attack_end = current_attack_end
    while game.runtime() <= this_attack_end:
        spawn_fireball()
        spawn_fireball()
        pause(1500/current_intensity)
        spawn_fireball()
        spawn_fireball()
        pause(2000/current_intensity)
        spawn_fireball()

def do_fireball_attack_2():
    this_attack_end = current_attack_end
    while game.runtime() <= this_attack_end:
        pause(3000/current_intensity)
        spawn_fireball()
        pause(200)
        spawn_fireball()
        pause(200)
        spawn_fireball()
        pause(200)
        spawn_fireball()
        pause(200)
        spawn_fireball()

def do_fireball_attack_3():
    this_attack_end = current_attack_end
    while game.runtime() <= this_attack_end:
        pause(400)
        spawn_fireball()

def add_round():
    global attack_1
    global attack_2
    global attack_3
    global attack_length
    global attack_intensity
    current_round = len(attack_1) + 1

    round_attack_1 = game.ask_for_number("select one of the attacks        of round " + current_round, 1)
    round_attack_2 = game.ask_for_number("select one of the attacks        of round " + current_round, 1)
    round_attack_3 = game.ask_for_number("select one of the attacks        of round " + current_round, 1)
    round_length = game.ask_for_number("enter the length of round " + current_round + " (in seconds)", 2)
    round_intensity = game.ask_for_number("select the intensity of round " + current_round, 3)

    attack_1.append(round_attack_1)
    attack_2.append(round_attack_2)
    attack_3.append(round_attack_3)
    attack_length.append(round_length)
    attack_intensity.append(round_intensity)
