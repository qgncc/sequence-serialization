#Описание

Данный алгоритм сериализует множество чисел, превращая его в набор последовательностей вида
\[start, step, stepAmount\], где start — это начало последовательности, step — это шаг последовательности,
а stepAmount — это количество шагов step в последовательности.

Последовательность записывается битами следующим образом:
x — первый бит, определят представляют следующие биты число(тогда бит равен нулю),
или последовательность(тогда бит равен единице)

xxxxxxxxx — девять следующих бит это число с которого начинается последовательность(start)
xxxxxxxxx — девять следующих бит это шаг(step)
xxxxxxxxx — девять последних бит это количество шагов(stepAmount)

#Установка и запуск

1.

```bash
git clone

```

2.

```bash
cd
```

3.

```bash
yarn

```

4.

```bash
yarn test
```