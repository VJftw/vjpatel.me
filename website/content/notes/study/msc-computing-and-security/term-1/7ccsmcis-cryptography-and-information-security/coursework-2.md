---
date: "2016-10-13T23:26:19+01:00"
course: "MSc Computing and Security"
module: "7CCSMCIS Cryptography and Information Security"
title: "Coursework 2"
latex: true
---

## Rail fence cipher: exercises

> Decrypt the following ciphertext that was generated using a rail fence cipher with 2 rails.
```
TEETN WRTRA HNWSE EOEBA TUSHR ISHBS KONOO MCIEA DVLPD YRHRC EBU
```

1. Count characters and divide by 2 to get split point. 53/2 = 26.5, so split at H.
```
T E E T N W R T R A H N W S E E O E B A T U S H R I S
 H B S K O N O O M C I E A D V L P D Y R H R C E B U
```

2. Gives: `THE BEST KNOWN ROTOR MACHINE WAS DEVELOPED BY ARTHUR SCHERIBIUS`

> Use a rail fence cipher with 3 rails to encipher this message: `alan turing the enigma`.

```
A  N  R  G  E  I  A
 L  T  I  T  E  G
  A  U  N  H  N  M
```

Gives:
`ANRGEIALTITEGAUNHNM`

## Rotating Grille



## A more complex transposition cipher: exercise

> As in the slides of the lecture, write the plaintext message:
> `The enigma cipher machine had the confidence of German forces who depended on its security`
> in a rectangle, row by row, and read the message off column by column but permute the order of the columns using the key `3571426`

| 3   | 5   | 7   | 1   | 4   | 2   | 6   |
| --- | --- | --- | --- | --- | --- | --- |
| t   | h   | e   | e   | n   | i   | g   |
| m   | a   | c   | i   | p   | h   | e   |
| r   | m   | a   | c   | h   | i   | n   |
| e   | h   | a   | d   | t   | h   | e   |
| c   | o   | n   | f   | i   | d   | e   |
| n   | c   | e   | o   | f   | g   | e   |
| r   | m   | a   | n   | f   | o   | r   |
| c   | e   | s   | w   | h   | o   | d   |
| e   | p   | e   | n   | d   | e   | d   |
| o   | n   | i   | t   | s   | s   | e   |
| c   | u   | r   | i   | t   | y   | x   |

```
Columns:
3. tmrecnrceoc
5. hamhocmepnu
7. ecaaneaseir
1. eicdfonwnti
4. nphtiffhdst
2. ihihdgooesy
6. geneeerddex

1. eicdfonwnti
2. ihihdgooesy
3. tmrecnrceoc
4. nphtiffhdst
5. hamhocmepnu
6. geneeerddex
7. ecaaneaseir
```

Encrypted with `3571426`:

```
eicdfonwntiihihdgooesytmrecnrceocnphtiffhdsthamhocmepnugeneeerddexecaaneaseir
```

#### Second transposition with the same key

| 3   | 5   | 7   | 1   | 4   | 2   | 6   |
| --- | --- | --- | --- | --- | --- | --- |
| e   | i   | c   | d   | f   | o   | n   |
| w   | n   | t   | i   | i   | h   | i   |
| h   | d   | g   | o   | o   | e   | s   |
| y   | t   | m   | r   | e   | c   | n   |
| r   | c   | e   | o   | c   | n   | p   |
| h   | t   | i   | f   | f   | h   | d   |
| s   | t   | h   | a   | m   | h   | o   |
| c   | m   | e   | p   | n   | u   | g   |
| e   | n   | e   | e   | e   | r   | d   |
| d   | e   | x   | e   | c   | a   | a   |
| n   | e   | a   | s   | e   | i   | r   |


```
Columns:
3. ewhyrhscedn
5. indtcttmnee
7. ctgmeiheexa
1. diorofapees
4. fioecfmnece
2. ohecnhhurai
6. nisnpdogdar

1. diorofapees
2. ohecnhhurai
3. ewhyrhscedn
4. fioecfmnece
5. indtcttmnee
6. nisnpdogdar
7. ctgmeiheexa
```

Encrypted with `3571426`:

```
diorofapeesohecnhhuraiewhyrhscednfioecfmneceindtcttmneenisnpdogdarctgmeiheexa
```

## The `ADFGVX` cipher: exercise

> Consider again the arrangement:

|     | A   | D   | F   | G   | V   | X   |
| --- | --- | --- | --- | --- | --- | --- |
| A   | 8   | P   | 3   | D   | 1   | N   |
| D   | L   | T   | 4   | O   | A   | H   |
| F   | 7   | K   | B   | C   | 5   | Z   |
| G   | J   | U   | 6   | W   | G   | M   |
| V   | X   | S   | V   | I   | R   | 2   |
| X   | 9   | E   | Y   | 0   | F   | Q   |

> and encrypt: `The quick brown fox jumps over the lazy dog` first with the key `MARK` and then with the key `TURING`.

Stage 1:

```
T  H  E  Q  U  I  C  K  B  R  O  W  N  F  O  X  J  U  M  P  S  O  V  E  R  T  H  E  L  A  Z  Y  D  O  G
DD DX XD XX GD VG FG FD FF VV DG GG AX XV DG VA GA GD GX AD VD DG VF XD VV DD DX XD DA DV FX XF AG DG GV
```

Stage 2:

```
M A R K
-------
D D D X
X D X X
G D V G
F G F D
F F V V
D G G G
A X X V
D G V A
G A G D
G X A D
V D D G
V F X D
V V D D
D X X D
D A D V
F X X F
A G D G
G V
```

```
A K M R
-------
D X D D
D X X X
D G G V
G D F F
F V F V
G G D G
X V A X
G A D V
A D G G
X D G A
D G V D
F D V X
V D V D
X D D X
A V D D
X F F X
G G A D
V   G
```

```
DDDGFGXGAXDFVXAXGV XXGDVGVADDGDDDVFG DXGFFDADGGVVVDDFAG DXVFVGXVGADXDXDXD
```


## Feistel Encryption/Decryption: exercise

>Show that output of decryption round 13 is equal to 32-bit swap of input to encryption round ... (first identify the corresponding encryption round and then prove the equivalence).

Given:

- $ LD_{16-i} \parallel RD_{16-i} = RE_i \parallel LE_i $.
- Encryption: $ LE_i = RE_{i-1} $ and $ RE_i = LE_{i-1} \oplus F(RE_{i-1}, K_i) $.
- Decryption: $ LD_i = RD_{i-1} $ and $ RD_i = LD_{i-1} \oplus F(RD_{i-1}, K_i) $.

We want to show that $ LD_{13} \parallel RD_{13} = RE_3 \parallel LE_3 $.

**Encryption**:

- $ LE_3 = RE_2 $
- $ RE_3 = LE_2 \oplus F(RE_2, K_3) $

**Decryption**:

- $ LD_{13} = RD_{12} = LE_4 = RE_3 $
- $ RD_{13} = LD_{12} \oplus F(RD_{12}, K_{13}) $
- $  = RE_4 \oplus F(LE_4, K_{13}) $
- $  = RE_4 \oplus F(RE_3, K_{13}) $
- $  = [LE_3 \oplus F(RE_3, K_{13})] \oplus F(RE_3, K_{13}) $
- $  = LE_3 $

Hence: $ LD_{13} \parallel RD_{13} = RE_3 \parallel LE_3 $.
