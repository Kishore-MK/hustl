#![no_std]
use soroban_sdk::{contract,contracttype, contractimpl, Address,Env, String, log,symbol_short, Symbol,Map,map};

#[contract]
pub struct Contract;


#[contracttype]
pub enum UserList{
    User(Address)    
}


#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct User {
    pub address: Address,
    pub upvote: u32,
    pub downvote: u32,
    pub repScore: u32
}

#[contractimpl]
impl Contract {
    pub fn createUser(env: Env, address: Address) -> User{
        let currentUser = User {
       address: address.clone(),
        upvote: 0,
        downvote: 0,
        repScore: 0,
        };

                        
        env.storage().instance().set(&UserList::User(currentUser.address.clone()), &currentUser);
        return currentUser;
        
    }

    
    pub fn viewUser(env: Env, address: Address) -> User {
        
        let key = UserList::User(address.clone()); 
        
        env.storage().instance().get(&key).unwrap_or(User {
            
            address: address.clone(),
        upvote: 0,
        downvote: 0,
            repScore: 0 
            
        })
    }


    pub fn upVote(env: Env , address: Address ) -> User {     
       
        let mut userData = Self::viewUser(env.clone(),address.clone());
        userData.upvote+=1;
        
        env.storage().instance().set(&UserList::User(address.clone()), &userData);

        userData

    }

    pub fn downVote(env: Env , address: Address ) -> User {     
       
        let mut userData = Self::viewUser(env.clone(),address.clone());
        userData.downvote+=1;
        env.storage().instance().set(&UserList::User(address.clone()), &userData);

        userData

    }

    
}