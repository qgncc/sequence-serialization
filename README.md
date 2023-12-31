# Описание

Данный алгоритм сериализует множество чисел, превращая его в набор последовательностей вида
\[start, step, stepAmount\], где start — это начало последовательности, step — это шаг последовательности,
а stepAmount — это количество шагов step в последовательности.

Последовательность записывается битами следующим образом:  
**1 aaaaaaaaa bbbbbbbbb ccccccccc**

**1** — первый бит, указывает на то, что следующие 27 бит описывают последовательность чисел  
**aaaaaaaaa** — девять следующих бит это число с которого начинается последовательность(start)  
**bbbbbbbbb** — девять следующих бит это шаг(step)  
**ccccccccc** — девять последних бит это количество шагов(stepAmount)

А число записывается так:  
**0 aaaaaaaaa**

**0** — бит указывает на то, что следующие 9 бит — число  
**aaaaaaaaa** — девять бит обозначающих число

# Установка и запуск

1.

```sh
$ git clone https://github.com/qgncc/sequence-serialization
```

2.

```sh
$ cd sequence-serialization
```

3.

```sh
$ yarn
```

4.

```sh
$ yarn test
```
