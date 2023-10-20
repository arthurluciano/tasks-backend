# Tasks

Foi utilizado Nest.js como framework para criação de um servidor node, banco de dados foi utilizado PostgresSQL e Prisma como ORM.

Pontos positivos:

- Framework sólido e robusto
- Criação de apis de forma muito fácil e rápida.
- Comunidade enorme
- Separação baseada em módulos é excelente.

Pontos negativos:

- Apesar de aplicar o SOLID, em alguns casos são vistos problemas na questão do Single Responsiblity Principle (Princípio da responsabilidade única), onde no caso
  de criarmos use-cases/services, não é possível criar um Controller para cada uso específico.
- É necessário uma base em desenvolvimento de backends simplificados, como Express / Fastify, pois é preciso para a compreensão da maneira de como o Nest.js trabalha.
- Por ser opinado, podemos ter problemas com implementação de patterns e arquiteturas de software (Clean Architecture, Domain Driven Design)
