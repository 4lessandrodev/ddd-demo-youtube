import { Entity, Ok, Result, UID } from "rich-domain";
import { UserNameValueObject as UserName } from "types-ddd";

interface Props {
    id?: UID;
    name: UserName;
}

export class Buyer extends Entity<Props>{
    private constructor(props: Props){
        super(props);
    }

    public static create(props: Props): Result<Buyer> {
        return Ok(new Buyer(props));
    }
}

export default Buyer;