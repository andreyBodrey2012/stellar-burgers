import fixtureIngredients from '../../fixtures/ingredients.json';
import fixtureOrderRequst from '../../fixtures/order_requst.json';
import fixtureNumberOrder from '../../fixtures/orders.json';

describe('проверяем страницу конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
  });

  it('проверяем добавление ингредиента из списка в конструктор', () => {
    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.data).to.have.length(15);
    });

    const button = cy.get(
      `li[data-cy=ingredient-item-${fixtureIngredients.data[0]._id}] button`
    );

    button.contains('Добавить');
    button.click();

    cy.get('[data-cy=order-price]').contains(
      `${fixtureIngredients.data[0].price * 2}`
    );
  });

  it('проверяем добавление булок и добавление начинок', () => {
    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.data).to.have.length(15);
    });

    let orderSum = 0;
    [
      fixtureIngredients.data.filter(({ type }) => type === 'bun')[1],
      fixtureIngredients.data[5],
      fixtureIngredients.data[4],
      fixtureIngredients.data[13]
    ].forEach((item) => {
      const button = cy.get(`li[data-cy=ingredient-item-${item._id}] button`);

      button.contains('Добавить');
      button.click();

      orderSum += item.type === 'bun' ? item.price * 2 : item.price;
      cy.get('[data-cy=order-price]').contains(`${orderSum}`);
    });
  });

  it('проверка открытия модального окна ингридиента', () => {
    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.data).to.have.length(15);
    });
    const item = fixtureIngredients.data[4];
    const link = cy.get(`li[data-cy=ingredient-item-${item._id}] a`);

    link.click();

    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-title]').contains('Детали ингредиента');
    cy.get('[data-cy=modal]').contains(item.name);

    cy.get('[data-cy=modal] button').click();
    cy.get('[data-cy=modal]').should('not.exist');

    link.click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-overlay]').should('exist');

    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=modal-overlay]').should('not.exist');
  });
});

describe('проверяем создание заказа бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
  });
  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearAllLocalStorage();
  })

  it('проверка создания заказа', () => {
    cy.setCookie('accessToken', 'accessToken');
    cy.setLocalStorage('refreshToken', 'refreshToken');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    cy.wait('@getUser').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    fixtureOrderRequst.ingredients.forEach((id) => {
      const button = cy.get(`li[data-cy=ingredient-item-${id}] button`);

      button.contains('Добавить');
      button.click();
    });

    const button = cy.get(`[data-cy=Button_create_order]`);

    button.contains('Оформить заказ');
    button.click();

    cy.intercept('POST', 'api/orders', { fixture: 'orders.json' }).as(
      'postOrder'
    );

    cy.wait('@postOrder').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.order.ingredients).to.have.length(6);
    });

    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains(fixtureNumberOrder.order.number);

    cy.get('[data-cy=modal] button').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=order-price]').contains(0);
  });
});
