#JobCoin Mixer
User Flow for Simple Mixer
1. You provide a list of new, unused ‘withdrawal’ addresses that you own to the mixer;
2. The mixer provides you with a new ‘deposit’ address that it owns;
3. You transfer your bitcoins to that ‘deposit’ address;
4. The mixer will detect your transfer by watching or polling the P2P Bitcoin network;
5. The mixer will transfer your bitcoin from the deposit address into a big “house account”
along with all the other bitcoin currently being mixed; and
6. Then, over some time the mixer will use the house account to dole out your bitcoin in
smaller discrete increments to the ‘withdrawal’ addresses that you provided, possibly
after deducting a fee.

##Transaction flow


![image](https://github.com/nikks95/bcoin-mixer/assets/22238994/b76f0178-7300-4d81-ad9d-7d9b50765d43)
