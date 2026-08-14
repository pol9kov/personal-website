/**
 * ВОРОТА ПРОВЕРЕНЫ НА УКУС, А НЕ НА ЗЕЛЁНЫЙ.
 *
 * Зелёный прогон здесь ничего не значил бы сам по себе: первая редакция правила
 * была «зелёной» и ловила НОЛЬ — `\b` после кириллицы не существует в JS, и
 * специмен проходил насквозь. Поэтому тест держит ОБЕ стороны: правило кусает
 * настоящие тела из истории репозитория и МОЛЧИТ на честных, снятых оттуда же.
 *
 * Запуск: node --test scripts/
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { ownerApprovalClaim, ownerApprovalVerdict } from './owner-approval-claim.mjs'

/** Специмен класса — c67f4c2, тело дословно. */
const SPECIMEN = `feat(imperia-os): approved hero + dream lines land — clean /spec/message door

Кнопка героя с подписью и открытие секции мечты — пары, утверждённые
Егором 12–13.08 построчно (EN/RU/ES). Ссылка юзкейза — чистый адрес
imperiaos.com/spec/message вместо hash-URL с процент-кодированием.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

/**
 * ЧЕСТНОЕ ТЕЛО, КОТОРОЕ ОБЯЗАНО ПРОЙТИ — f31a14a. Здесь «Утверждение» это ТЕЗИС
 * страницы, а слово владельца принесено ЦИТАТОЙ. Если ворота ругаются на него,
 * они наказывают ровно ту работу, ради которой заведены.
 */
const HONEST_HOMONYM = `feat(imperia-os): «У каждого действия есть след» — вплотную к виджету

Виджет и есть этот след: его цифры — действия агентов за сутки. Утверждение
со ссылкой на живой разбор хода стояло третьим экраном ниже, между «платформа
строит себя сама» и «дальше — обмен», а окно висело без слов.

Идея Егора 2026-08-14: «У каждого действия есть след → будто бы рядом с
виджетом лучше будет выглядеть».`

/** Прилагательное без названного автора апрува — 96cdca0. Законно. */
const NO_OWNER_NAMED = `feat(imperia-os): первая строка без абсолюта — утверждённая формула, три языка, pdf пересобраны`

test('специмен c67f4c2: апрув заявлен, провенанс не назван — отказ', () => {
  const v = ownerApprovalVerdict(SPECIMEN)
  assert.equal(v.ok, false)
  assert.match(v.red, /ПРОВЕНАНС НЕ НАЗВАН ВОВСЕ/)
  // Отказ обязан показать ТУ САМУЮ строку, а не ругаться на сообщение целиком.
  assert.match(v.red, /утверждённые/)
  // И назвать оба законных выхода, иначе автор не знает, что делать.
  assert.match(v.red, /Owner-Word: <id события>/)
  assert.match(v.red, /сними саму претензию/)
})

test('тот же специмен с трейлером провенанса — проходит', () => {
  const withTrailer = `${SPECIMEN}\n\nOwner-Word: 1dc461ab-0000-4000-8000-000000000000`
  assert.equal(ownerApprovalVerdict(withTrailer).ok, true)
  assert.equal(
    ownerApprovalClaim(withTrailer).provenance,
    '1dc461ab-0000-4000-8000-000000000000',
  )
})

test('омоним «утверждение» (тезис страницы) + цитата владельца — молчит', () => {
  assert.equal(ownerApprovalVerdict(HONEST_HOMONYM).ok, true)
  assert.equal(ownerApprovalClaim(HONEST_HOMONYM).claimed, false)
})

test('«утверждённая формула» без названного владельца — молчит', () => {
  assert.equal(ownerApprovalVerdict(NO_OWNER_NAMED).ok, true)
})

test('подпись Co-Authored-By не считается претензией на апрув', () => {
  const msg = 'chore(x): y\n\nCo-Authored-By: Someone Approved <owner@example.com>'
  assert.equal(ownerApprovalVerdict(msg).ok, true)
})

test('кириллица: «Егором» распознаётся (ловушка \\b в JS)', () => {
  // Регрессия на собственную ошибку: с `\b` правило давало НОЛЬ срабатываний.
  assert.equal(ownerApprovalClaim('утверждённые Егором построчно').claimed, true)
})

test('цитата чужой претензии срабатывает так же — край известен и НАРОЧЕН', () => {
  // Этот случай не гипотетический: коммит, ставивший ворота, был ими отклонён,
  // потому что цитировал тело специмена. Исключение «в кавычках не считаем»
  // было бы лазейкой, поэтому поведение закреплено как ожидаемое.
  const discussing = [
    'docs(defect): разбор класса owner-bafflement',
    '',
    'Специмен заявил телом: «пары, утверждённые Егором построчно» — апрува в записи нет.',
  ].join('\n')
  assert.equal(ownerApprovalVerdict(discussing).ok, false)
})

/**
 * УКУС ПО ЖИВОЙ ИСТОРИИ. Полоса пиновком до f31a14a — состояние репозитория на
 * момент разбора; ровно три тела заявляют апрув владельца без провенанса.
 * Вырастет число — значит класс снова пролез мимо ворот (или ворота расширились
 * на честные тела): и то и другое требует глаз, а не подкрутки цифры.
 */
test('корпус истории: ровно 3 тела заявляют апрув без провенанса', () => {
  const SEP = '@@@COMMIT@@@'
  const raw = execSync(`git log f31a14a1f --format="%H%n%B${SEP}"`, {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    cwd: new URL('..', import.meta.url).pathname,
  })
  const fired = raw
    .split(SEP)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((b) => {
      const i = b.indexOf('\n')
      return { sha: b.slice(0, i === -1 ? b.length : i).trim(), msg: i === -1 ? '' : b.slice(i + 1) }
    })
    .filter((it) => !ownerApprovalVerdict(it.msg).ok)
    .map((it) => it.sha.slice(0, 9))
    .sort()

  assert.deepEqual(fired, ['8223779e9', 'a214e6d3e', 'c67f4c223'].sort())
})
