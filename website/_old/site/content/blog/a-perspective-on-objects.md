+++
date = "2012-08-15T22:32:09+01:00"
title = "A Perspective on Objects"
summary = "Object-oriented programming is a very important and sometimes challenging concept in Computer Science. This post will detail my interpretation of it and the way I use it to solve challenges in development."
tags = ["development"]
+++


I'm sure that if you're reading this, you've heard of a phenomenon called Object-Oriented Programming/Design(OOP/OOD respectively). If you haven't, in a nutshell it's just a way of thinking about problems or situations in a more materialistic manner in order to make solving or modelling them easier.

## What makes an object?

This works in exactly the same way that we naturally distinguish different things in our lives.
For example, I don’t know, let's talk about pizza. I like pizza. When shown a pizza, you're able to identify it as a pizza. When you're shown another pizza (for example with a different topping or cheese), you're still able to identify it as a pizza. Why? Because you know that for something to be a pizza, it has to be a oven-baked, flat, round bread that is topped with a tomato sauce, cheese and toppings. In this case, Pizza can be our object. All objects have qualities more than often can change depending on the use case. From our understanding of what a pizza is, we can derive our object.

This could look something like this:

#### Pizza

Attribute       | Description & Example
----------------|-----------------------------------------------------------------------------------------------------------------------------------------------
Base type       | Could be like Deep-pan, Italian thin, Stuffed crust etc.
Type of cheese  | Mozzarella, Cheddar etc. I don't know, whatever cheese you like on your pizzas
Base sauce      | Tomato, BBQ etc.
Toppings        | Self explanatory... Note: If you know what arrays are(basically sets of data (more commonly known as a list)), this can be represented as one to save having Topping 1, Topping 2 etc.


Note: We could go deeper (or shallower for that matter) but I'm deeming that unnecessary for this example. Also, if you can't understand how I got to those attributes... Let me know and I'll try to think of a nicer way of explaining it.

Now, with our *Pizza* object above, we can describe a *Pepperoni Pizza* using those attributes, for example:

#### Pepperoni Pizza

Attribute   | Value
------------|-------------
Base type   | Deep-pan
Cheese      | Mozzarella
Base sauce  | Tomato
Toppings    | Pepperoni


### So we have our object, now what?
Right now, all we have is a very simple definition of a *Pepperoni Pizza*. Think about what you could do with a *Pepperoni Pizza*... You can eat it! So let's make that our requirement: *We should be able to eat a Pizza*

Next we think about what states our Pizza can be in to satisfy this requirement. *Eating* a pizza implies that it can be *Eaten* or *!Eaten*.
We need to keep track of this state and we can use a boolean(True/False) primitive type to store it like so:

#### Pepperoni Pizza

Attribute   | Value
------------|---------------
Base type   | Deep-pan
Cheese      | Mozzarella
Base sauce  | Tomato
Toppings    | Pepperoni
Eaten       | False

Next we can draw a FSM(Finite State Machine) that portrays how this our *Pizza* object will transition between an *Eaten* and *!Eaten* state.

**TODO: Learn SVG css stuff and draw FSM with it**

Normally we don't need to do physically draw out an FSM, as a lot of requirments are simple enough to visualise in your head.

So with our FSM, we have identified a single transition *Eat* which changes our *Pizza* from *!Eaten* to *Eaten*.

This single transition *Eat* isn't a quality of a *Pizza*, it's an **action** you can take on a *Pizza*, therefore this should be implemented as a method that sets *Eaten* to True.

### Limitations

**TODO: Clean up and mention randomness**

It's arguably impossible to perfectly solve many real world problems as we can model and make predictions based on data we are given. However, it is possible to create a theoretical model for anything which is close to a perfect solution.

With OOP we can solve more challenging problems, for example a relationship between two people. We can take a focus entity John and monitor him to see how he interacts with Steve and Ted. If John speaks to Steve more than Ted we can naturally assume that John likes Steve more than Ted. However, this isn't flawless as John may secretly hate Steve but speaks to him for help on his work or something. You could dive in deeper and analyse what their conversations are about, work? life? anything and everything? but as we get closer to perfectly accurate, the amount of time to process all of this information increases exponentially and so we end up with a trade-off between accuracy and time.
