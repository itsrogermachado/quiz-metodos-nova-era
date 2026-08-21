# Quiz Nova Era

Quiz de avaliação com 7 perguntas, cronômetro e pontuação, construído em
**JavaScript puro** — sem framework, sem build, sem uma única dependência.

![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![sem dependências](https://img.shields.io/badge/dependências-0-3B6642?style=flat-square)

## O que tem dentro

- **Quatro telas** controladas por estado: boas-vindas, quiz, carregamento e resultado
- **Barra de progresso** que acompanha a pergunta atual
- **Cronômetro** por pergunta
- **Pontuação** calculada ao final
- **Encaminhamento para WhatsApp** com o resultado
- **Política de privacidade** em página própria

## Por que sem framework

O projeto existe para exercitar o fundamento: manipulação de DOM, controle de
estado entre telas e temporizador, sem a rede de segurança de uma biblioteca.
São três arquivos — `index.html`, `style.css` e `app.js` — e nenhum passo de build.

## Rodando localmente

Não há instalação. Basta abrir o `index.html` no navegador, ou servir a pasta:

```bash
git clone https://github.com/itsrogermachado/quiz-metodos-nova-era
cd quiz-metodos-nova-era
python -m http.server 8000
```

Abra <http://localhost:8000>.

## Estrutura

```
index.html                    # marcação das quatro telas
style.css                     # estilos
app.js                        # perguntas, estado, cronômetro e pontuação
politica-de-privacidade.html  # política de privacidade
```

## Licença

MIT — veja [LICENSE](LICENSE).
