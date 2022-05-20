import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../entities/users.entity'
import { UsersService } from './users.service'

describe('The UsersService', () => {
  let usersService: UsersService
  let findOne: jest.Mock
  beforeAll(async () => {
    findOne = jest.fn()
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne
          }
        }
      ],
    }).compile()

    usersService = await module.get(UsersService)
  })
  describe('Users Service unity testing', () => {
    let user: User;
    beforeAll(() => {
      user = new User();
      findOne.mockReturnValue(Promise.resolve(user))
    })
    it('should return the user', async () => {
      const fetchedUser = await usersService.findOne(user.id)
      expect(fetchedUser).toEqual(user)
    })
  })
});