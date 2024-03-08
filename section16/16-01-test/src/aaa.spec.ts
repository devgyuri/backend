it('add test', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

describe('my test group', () => {
  it('add test', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });

  it('multiply test', () => {
    const a = 1;
    const b = 2;

    expect(a * b).toBe(2);
  });
});

describe('buy product test', () => {
  // 모든 it 실행하기 전에 딱 한번 실행 (ex. 로그인)
  beforeAll(() => {});

  // 각각의 it 실행하기 전에 매번 실행 (ex. 초기화, 초기값)
  beforeEach(() => {});

  it('check money', () => {
    // 돈 검증 로직
    const result = true;
    expect(result).toBe(true);
  });
  it('buy product', () => {
    // 상품 구매 로직
    const result = true;
    expect(result).toBe(true);
  });
});
