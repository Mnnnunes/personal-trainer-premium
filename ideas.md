# Direção de Design — Personal Trainer Premium

## Três abordagens exploradas

### 1. Disciplina Esculpida
**Muito Breve Intro:** Uma linguagem editorial de alta performance, com grandes áreas de respiro preto, linhas técnicas em azul-chumbo e composições assimétricas que evocam precisão e progresso. A sensação é de um plano individual, não de uma academia genérica.

**Probability:** 0.07

### 2. Academia de Concreto
**Muito Breve Intro:** Uma estética brutalista refinada, inspirada em metal escovado, concreto e numeração industrial. A interface é direta e monumental, com contraste agressivo e pouca ornamentação.

**Probability:** 0.03

### 3. Pulso Noturno
**Muito Breve Intro:** Uma experiência escura e cinematográfica com rastros de luz azul e superfícies translúcidas. O movimento sugere ritmo, energia e treino em alta intensidade.

**Probability:** 0.09

---

## Abordagem selecionada — Disciplina Esculpida

### Movimento de Design
**Editorial técnico de alta performance**, inspirado em campanhas esportivas premium, layouts de revista contemporânea e sinalização de ambientes de treinamento profissional.

### Princípios Centrais

1. **Contraste com propósito:** grandes massas escuras, tipografia branca de alto impacto e azul-chumbo empregado exclusivamente para guiar a ação, sem ruído visual.
2. **Progresso visível:** números, linhas de eixo, índices e marcadores técnicos reforçam acompanhamento e evolução contínua.
3. **Assimetria controlada:** blocos de conteúdo deslocados, imagens em recortes verticais e faixas horizontais eliminam a aparência de template.
4. **Energia contida:** animações rápidas e discretas, com entradas em camadas e microinterações responsivas, sem excessos chamativos.

### Filosofia de Cor

O **preto quase absoluto** cria concentração e sofisticação; o **branco frio** mantém leitura imediata; o **azul-chumbo profundo** é a assinatura de método, controle e competência. Gradientes só devem surgir como transições de profundidade entre o preto e o azul, nunca como elemento decorativo dominante.

### Paradigma de Layout

A página será construída como uma sequência de **quadros editoriais conectados por uma linha de progresso vertical**. Em desktop, o conteúdo alternará entre blocos largos e colunas deslocadas; em mobile, a mesma linha se transforma em uma referência lateral que organiza a leitura sem gerar excesso de grade centralizada.

### Elementos Assinatura

1. **Marcadores de série:** pequenos códigos numéricos e rótulos em caixa alta, como `01 / MÉTODO` e `04 / RESULTADOS`.
2. **Linha de pulso azul-chumbo:** filete técnico que conecta títulos, etapas e CTAs.
3. **Recortes de imagem angulares:** fotografia em painéis verticais com overlay azul-preto e bordas de alta precisão.

### Filosofia de Interação

Cada interação deve parecer uma confirmação de precisão: botões têm pressão curta, cards ascendem poucos pixels e a navegação responde sem atraso. Links de conversão são sempre inequívocos e permanecem acessíveis, com o WhatsApp como ação principal.

### Animação

Entradas utilizam opacidade e deslocamento vertical entre 16 e 28 px com uma curva de saída acentuada. Grupos ganham atrasos de 50–80 ms. Os contadores são acionados quando entram em cena; a imagem do hero recebe parallax mínimo; `prefers-reduced-motion` desativa as animações não essenciais. Não serão animadas propriedades que provoquem reflow contínuo.

### Sistema Tipográfico

**Barlow Condensed** em pesos 600–800 conduz as mensagens de impacto, com tracking ligeiramente fechado e caixa alta nas chamadas. **Manrope** em pesos 400–700 mantém textos de apoio e controles extremamente legíveis. Títulos não devem usar tipografia genérica nem ser centralizados por padrão; cada headline deve criar direção no layout.

### Essência da Marca

**Uma mentoria de treino personalizada para quem busca evolução mensurável com estratégia, consistência e acompanhamento próximo.**

Personalidade: **disciplinada, precisa, confiante**.

### Voz da Marca

A comunicação é firme, específica e encorajadora. Headlines falam de processo e resultado; CTAs convidam para uma conversa objetiva, sem promessas vagas.

Exemplos: “**Não é sobre fazer mais. É sobre treinar com direção.**”

“**Transforme intenção em consistência. Vamos traçar seu plano.**”

### Wordmark e Logo

O logotipo usa um **monograma geométrico abstrato em forma de eixo inclinado**, sugerindo a letra `P` e a ideia de movimento/controlado. Ao lado, o nome editável do profissional é composto em Barlow Condensed; o símbolo funciona sozinho como favicon e marca de navegação.

### Cor Assinatura

**Azul Violeta — #3C35AA.** Um azul-violeta profundo alinhado à roupa da personal, aplicado em ações, marcadores técnicos e momentos ativos da marca.

## Conteúdo editável priorizado

O arquivo `client/src/pages/Home.tsx` concentrará os valores fáceis de substituir: nome profissional, telefone do WhatsApp, perfil do Instagram, números demonstrativos, fotos demonstrativas e textos de depoimentos. Enquanto os dados reais não forem informados, todos os números, posts, imagens de resultado e depoimentos carregarão marcadores explícitos de demonstração.

## Style Decisions

- A **linha de pulso Azul Eixo** passa a operar como espinha visual contínua da página. Ela conecta a sequência de seções, índices de método, legendas de imagem e momentos de CTA, criando a sensação de plano acompanhado do início ao contato.
- O **Azul Eixo #183A5A** fica reservado a ações principais, marcadores de progresso, índices técnicos e manifestações ativas da marca. Não deve ser utilizado como brilho decorativo ou gradiente genérico.
- Os lockups editoriais alternam escala, numerais de fundo, linhas técnicas e painéis verticais de imagem. Mais de duas seções consecutivas não devem repetir a mesma estrutura de headline empilhada.
- O símbolo de eixo inclinado ganha presença no header, footer e CTA de decisão, reforçando que o profissional oferece um método reconhecível, e não apenas sessões avulsas.
