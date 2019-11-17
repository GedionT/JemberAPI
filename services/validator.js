const joi 		= 	require('joi');

module.exports  =  {

	validateParams,
	validateBody,
	Schemas: {

		userSchema: joi.object().keys({
			firstName: joi.string().required(),
			lastName : joi.string().required(),
			phone	 : joi.string().phone().required();
		})

		idSchema: joi.object().keys({
		  params: joi.string().regex(/^[0-9a-fA-F]{24}$/).required() 
		})
	}
}


function validateParams(schema, name) => {
	
	return (req, res, next) => {
		const result = joi.validate({ param: req['params'][name]}, schema);

			if(result.error)
				return res.status(400).json(result.error);
			else {
				if(!req.value)
					req.value = {};

				if(!req.value['params'])
					req.value['params'] = {};

				req.value['params'][name] = result.value.param;
				next();
			}
	}

}

function validateBody(schema) => {

	return (req, res, next) => {
		const result = joi.validate(req.body, schema);

			if(result.error)
				return res.status(400).json(result.error);
			else {
				if(!req.value)
					req.value = {};

				if(!req.value['body'])
					req.value['body'] = {};

				req.value['body'] = result.value;
				next();
			}
	}

}