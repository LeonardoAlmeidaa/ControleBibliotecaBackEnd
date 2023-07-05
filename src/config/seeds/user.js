exports.seed = async function (knex) {
  await knex('user').del()
  await knex('user').insert([
    {
      name: 'super',
      email: 'teste@teste.com.br',
      password:'$2b$10$3qWOYbAMTaDodeXgl2UWVu5GC11i/0j7BCwD0gWixwMeNWZFdzFdW',
      obs:'primeiro usuário do projeto'
    },
  ])
}
